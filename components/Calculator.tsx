import React from 'react'
import { useState, useEffect } from 'react'
import { Metrics } from './ChartBlock'
import Button from './Button'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

const Calculator = ({metrics}: any) => {
    const [data, setData] = useState({} as Metrics)
    const [mounted, setMounted] = useState(false)
    const [funds, setFunds] = useState(1000.0)
    const [fees, setFees] = useState(0.0) // Binance allows 0% trading fees for some pairs
    const [stopLoss, setStopLoss] = useState(0.5)
    const [takeProfit, setTakeProfit] = useState(1.0)
    const [profit, setProfit] = useState(0.0)
    const [profitBG, setProfitBG] = useState('black')

    const setBG = async () => {return (profit >= 0) ? 'green-500' : 'red-500'}
    const calculate = async(initFunds:number, fees:number, stopL:number = stopLoss, takeP:number = takeProfit) => {
        // Trading logic:
        // is correctPred? -> funds++ else funds--
        // is currentForecast up or down? -> 
        // is lastForecast up or down? -> 
        //      if same -> do nothing
        //      else -> close, open new position
        
        const correct = await data.data?.correct
        const forecasted = await data.data?.forecasted
        const price = data.data?.price_close
        var calcFunds = initFunds
        var stopTrade = false
        var savedPrice = 0.0

        if (price !== null && typeof price === 'object') {
            const lastPrice: any = Object.values(price).slice(0, -1) // Array not including the last price
            const lastForecast: any = Object.values(forecasted).slice(0, -1) 
            const currentPrice = Object.values(price).slice(1) // Array not including the first price
            const currentForecast: any = Object.values(forecasted).slice(1) // Array not including the first forecast

            var closeTrade: boolean = false

            const percentChange = currentPrice.map((value, index): any => {
                const sameTrade: boolean = Math.round(currentForecast[index]) === Math.round(lastForecast[index])
                var results = (value as any - lastPrice[index]) // Price difference between current and last
                                / lastPrice[index] // Divide by last price to get fraction change
                                * 100 // Multiply by 100 to get percent change
                                * (Math.round(currentForecast[index]) * 2 - 1) // Multiply by forecast (-1 or 1) to get profit/loss
                closeTrade = (sameTrade) ? (results <= -stopL) || (results >= takeP) || closeTrade : // Same trade? Check for limit triggers or closed trades
                                false // New trade
                results =   (results <= -stopL) ? -stopL : // Stop loss check
                            (results >= takeP) ? takeP : // Take profit check
                            results
                results =   (closeTrade) ? 0.0 : // Adjusting for closed trades
                            (sameTrade) ? results : // No fees for same trade
                            results - fees // Including fees
                return  results
            })

            for (var index in percentChange) {
                calcFunds = Number(calcFunds) + (Number(calcFunds) * percentChange[index] / 100)
            }
        }
        return calcFunds - initFunds
    }

    const getData = async() => {
        if (data !== null && typeof data === 'object') {
            setData(await metrics)
        }
        setProfit(await calculate(funds, fees, stopLoss, takeProfit))
        setProfitBG(await setBG())
    }

    const optimizeLosses = async () => { // Optimize stop loss and take profit calculations
        if (mounted && (Object.keys(data).length != 0)) {
            var bestProfit = -funds
            var bestProfitIndexL = 0.0
            var bestProfitIndexP = 0.0

            for (let i = 0.1; i < 5.0; i += 0.1) {     
                for (let j = 0.1; j < 5.0; j += 0.1) {    
                    const currentProfit = await calculate(funds, fees, i, j)
                    if (currentProfit > bestProfit) {
                        bestProfitIndexL = i
                        bestProfitIndexP = j
                        bestProfit = currentProfit
                    }
                }   

            }

            setStopLoss(Math.round(bestProfitIndexL * 10) / 10)
            setTakeProfit(Math.round(bestProfitIndexP * 10) / 10)
            // setProfit(await calculate(funds, fees, stopLoss, takeProfit) - funds)
            // setProfitBG(await setBG())
        }
    }
    
    useEffect(() => {
        if (!mounted) {
          setMounted(true)
        } else {
            getData()
        }
      }, [metrics, data, mounted, profit, profitBG, stopLoss, takeProfit, fees, funds])

  return (
    <div className='flex flex-auto w-full justify-center'>
        <div className={`flex flex-col lg:flex-row place-items-center sm:gap-5 p-2 sm:p-5 w-full bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl`}>
            <div className='flex flex-col w-full place-items-between lg:w-1/2 lg:m-5 gap-5 py-5 px-3 sm:px-5 text-justify lg:text-left '>
                <div className='font text-xl text-center sm:text-justify sm:text-2xl font-bold'>
                    Calculator:
                </div>
                <div className='font text-sm sm:text-base'>
                    Calculate the profitablity for a given set of starting funds and exchange trading fees, 
                    provided that the following trading logic had been used for the selected chart time period. 
                    The trading logic assumed is that a long position is opened for each &apos;up&apos; signal, and a short position is opened for each &apos;down&apos; signal. 
                    The trade is not closed until the indicator changes from &apos;up&apos; to &apos;down&apos;, or vice&ndash;versa. New trades are only opened after a trade is closed.
                    If trailing stop is active, the trade is closed when triggered. The trade remains closed until the next indicator change. 
                    The trailing stop is only checked on an hourly basis.
                    Setting the trailing stop to 100&#37; will deactivate it.
                    These are not trading suggestions, they only represent the logic behind this calculator.
                </div>
                <div className='text-xs sm:text-base'>
                    <Latex>
                        $$profit \approx \sum_&#123;t=0&#125;^&#123;hours&#125;funds_&#123;t&#125;\times(1 \pm c_t - 2\times fees)$$
                        $funds_&#123;t&#125; = $ starting funds at open for hour $t\\$
                        $c_t =$ adjusted percent change at close for hour $t\\$
                        $fees = \frac&#123;maker+taker&#125;&#123;2&#125; = $ input trading fees$\\$
                        $fees = 0$ if the forecast is unchanged$\\$
                        $\pm$ to denote correct or incorrect prediction for hour $t$
                    </Latex>
                </div>
                <div className='border-t-2 border-yellow-500 max-w-sm px-5 place-self-center text-yellow-700 dark:text-yellow-500 text-sm text-center rounded-lg'>
                    WARNING! Calculated profit may not be accurate.
                </div>
            </div>
            <div className='flex w-fit h-fit lg:w-1/2 m-3 lg:m-5 gap-5 py-5 px-3 sm:px-5 text-center lg:text-left bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 rounded-xl'>
                <div className='flex flex-row flex-wrap w-full min-w-fit justify-between gap-3 font text-sm sm:text-base'>
                    <div className={`border-b-4 flex flex-col sm:flex-row place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl border-${profitBG}`}>
                        <div className={`font font-bold text-lg sm:text-2xl`}>
                            Calculated profit:
                        </div>
                        <div className={`font font-bold text-xl sm:text-2xl text-right text-${profitBG}`}>
                            ${profit.toFixed(2)}
                        </div>
                    </div>
                    <div className={`flex flex-col sm:flex-row place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800`}>
                        <div className={`font font-bold text-base sm:text-lg`}>
                            Starting funds &#40;&#36;&#41;:
                        </div>
                        <input name='starting funds' type='number' value={funds} onChange={(event: any) => setFunds(event.target.value)} step={100} className='max-w-[30%] text-right pr-1 text-lg bg-zinc-300 dark:bg-zinc-700 rounded-md' />
                    </div>
                    <div className={`flex flex-col sm:flex-row place-content-center sm:place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800`}>
                        <div className={`font font-bold text-base sm:text-lg`}>
                            Trading fees &#40;&#37;&#41;:
                        </div>
                        <input name='exchange fees' type='number' value={fees} onChange={(event: any) => setFees(event.target.value)} step={0.01} className='max-w-[30%] text-right pr-1 text-lg bg-zinc-300 dark:bg-zinc-700 rounded-md' />
                    </div>
                    <div className={`flex flex-col sm:flex-row place-content-center sm:place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800`}>
                        <div className={`font font-bold text-base sm:text-lg`}>
                            Trailing stop &#40;&#37;&#41;:
                        </div>
                        <input name='trailing stop' type='number' value={stopLoss} onChange={(event: any) => setStopLoss(event.target.value)} step={0.1} className='max-w-[30%] text-right pr-1 text-lg bg-zinc-300 dark:bg-zinc-700 rounded-md' />
                    </div>
                    <div className={`flex flex-col sm:flex-row place-content-center sm:place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800`}>
                        <div className={`font font-bold text-base sm:text-lg`}>
                            Take profit &#40;&#37;&#41;:
                        </div>
                        <input name='take profit' type='number' value={takeProfit} onChange={(event: any) => setTakeProfit(event.target.value)} step={0.1} className='max-w-[30%] text-right pr-1 text-lg bg-zinc-300 dark:bg-zinc-700 rounded-md' />
                    </div>
                    <div className='flex w-full gap-5 place-content-center'>
                        <Button
                            height = '50px'
                            onClick = {() => optimizeLosses()}
                            width = '150px'
                            textSize = 'text-lg'
                            > {'Optimize'} </Button>
                        {/* <Button
                            height = '50px'
                            onClick = {() => getData()}
                            width = '150px'
                            textSize = 'text-lg'
                            > {'Calculate'} </Button> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calculator
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
    const [stopLoss, setStopLoss] = useState(0.1)
    const [profit, setProfit] = useState(0.0)
    const [profitBG, setProfitBG] = useState('')

    const setBG = async () => {return (profit >= 0) ? 'bg-green-500' : 'bg-red-500'}
    const calculate = async(funds:number, fees:number) => {
        // Trading logic:
        // is correctPred? -> funds++ else funds--
        // is currentForecast up or down? -> 
        // is lastForecast up or down? -> 
        //      if same -> do nothing
        //      else -> close, open new position
        
        const correct = await data.data?.correct
        const forecasted = await data.data?.forecasted
        const price = await data.data?.price_close
        var stopTrade = false

        for (var key in price) {
            if (Object.keys(price).indexOf(key) != (Object.keys(price).length)-1){ // Don't include the last entry
                
                const index: any = Object.keys(price).indexOf(key)
                const currentPrice: any = price[key]
                const lastPrice: any = () => {return (index === 0) ? price[key] : Object.values(price)[Object.keys(price).indexOf(key) - 1]}
                const correctPred: any = Object.values(correct)[Object.keys(correct).indexOf(key)]
                const percentChange: any = Math.abs((lastPrice()-currentPrice)/lastPrice()) // We have short and long positions, we don't care about positive or negative changes
                const currentForecast: any = Math.round(forecasted[key]) // Forecasts are paired with their associated timestamp, so current timestamp is last hour's forecast
                const lastForecast: any = () => {return (index === 0) ? currentForecast : Math.round(Object.values(forecasted)[Object.keys(forecasted).indexOf(key) - 1] as any)}
                const adjustedFee: any = () => {return (currentForecast == lastForecast()) ? 0 : (fees/100)}

                // Trailing stop loss
                const adjustedPercentChange: any = (inc: Boolean) => {
                    if (percentChange > stopLoss / 100 && inc) { // Is the prediction incorrect? is the stop loss active?
                        stopTrade = true
                        return stopLoss / 100
                    } else if (currentForecast != lastForecast()) { // Is this a new trade?
                        stopTrade = false
                        return percentChange
                    } else if (stopTrade) { // Stop loss active
                        return 0
                    } else {
                        return percentChange // Stop loss inactive
                    }
                }
                if (correctPred) {
                    funds = funds*(1 + adjustedPercentChange(false) - 2*adjustedFee())
                } else {
                    funds = funds*(1 - adjustedPercentChange(true) - 2*adjustedFee())
                }
            }
        }
        return funds
    }

    const getData = async() => {
        setData(await metrics)
        setProfit(await calculate(funds, fees) - funds)
        setProfitBG(await setBG())
    }
    
    useEffect(() => {
        if (!mounted) {
          setMounted(true)
        }
        getData()
      }, [metrics, data, mounted, profit, profitBG])

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
                <div className='font text-sm sm:text-base text-left'>
                    WARNING! Calculated profit may not be accurate.
                </div>
            </div>
            <div className='flex w-fit h-fit lg:w-1/2 m-3 lg:m-5 gap-5 py-5 px-3 sm:px-5 text-center lg:text-left bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 rounded-xl'>
                <div className='flex flex-row flex-wrap w-full min-w-fit justify-between gap-3 font text-sm sm:text-base'>
                    <div className={`flex flex-col sm:flex-row place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl text-white ${profitBG}`}>
                        <div className={`font font-bold text-lg sm:text-2xl`}>
                            Calculated profit:
                        </div>
                        <div className={`font font-bold text-xl sm:text-2xl text-right`}>
                            ${profit.toFixed(2)}
                        </div>
                    </div>
                    <div className={`flex flex-col sm:flex-row place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl bg-zinc-300 dark:bg-zinc-800`}>
                        <div className={`font font-bold text-base sm:text-lg`}>
                            Starting funds &#40;&#36;&#41;:
                        </div>
                        <input name='starting funds' type='number' value={funds} onChange={(event: any) => setFunds(event.target.value)} step={100} className='max-w-[30%] text-center sm:text-right text-lg bg-zinc-300 dark:bg-zinc-800' />
                    </div>
                    <div className={`flex flex-col sm:flex-row place-content-center sm:place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl bg-zinc-300 dark:bg-zinc-800`}>
                        <div className={`font font-bold text-base sm:text-lg`}>
                            Trading fees &#40;&#37;&#41;:
                        </div>
                        <input name='exchange fees' type='number' value={fees} onChange={(event: any) => setFees(event.target.value)} step={0.01} className='max-w-[30%] text-center sm:text-right text-lg bg-zinc-300 dark:bg-zinc-800' />
                    </div>
                    <div className={`flex flex-col sm:flex-row place-content-center sm:place-content-between place-items-center w-full min-w-fit sm:px-10 py-3 h-fit gap-3 shrink-0 rounded-xl bg-zinc-300 dark:bg-zinc-800`}>
                        <div className={`font font-bold text-base sm:text-lg`}>
                            Trailing stop &#40;&#37;&#41;:
                        </div>
                        <input name='exchange fees' type='number' value={stopLoss} onChange={(event: any) => setStopLoss(event.target.value)} step={0.1} className='max-w-[30%] text-center sm:text-right text-lg bg-zinc-300 dark:bg-zinc-800' />
                    </div>
                    <div className='flex w-full place-content-center'>
                        <Button
                            height = '50px'
                            onClick = {() => getData()}
                            width = '150px'
                            textSize = 'text-lg'
                            > {'Calculate'} </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calculator
import React from 'react'
import { useState, useEffect } from 'react';
import LineChart from './LineChart';
import Button from './Button';
import Metrics from './Metrics';
import UpDown from './UpDown';
import Calculator from './Calculator';

export type Forecast = {
  statusCode: number, 
  body: String, 
  forecasted: number;
  data: {
      actual: any;
      forecasted: any;
      price_close: any;
  };
}
export type Metrics = {
  statusCode: number, 
  body: String, 
  forecasted: number;
  correct: number;
  incorrect: number;
  upSignals: number;
  downSignals: number;
  total: number;
  data: {
      forecasted: any;
      price_close: any;
      correct: any;
  };
}

const ChartBlock = () => {
  const [mounted, setMounted] = useState(false) 
  const [chartData, setChartData] = useState({} as Forecast)
  const [metrics, setMetrics] = useState({} as Metrics)
  const [upDown, setUpDown] = useState('' as String)
  const [upDownBG, setUpDownBG] = useState('' as String)
  const [chart, setChart] = useState(<div>Loading...</div> as any)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      getForecast(721) // 721 hours for 30 days because the last entry is a forecast
      getMetrics(721)
    }
  }, [chartData, metrics, mounted])

  const getForecast = async (rowsRequested:Number) => {
    const url = 'https://wni1mr4idl.execute-api.us-west-2.amazonaws.com/Alpha/forecast-v2/'
    const headers = {
        method: 'POST',
        body: JSON.stringify({ rows: rowsRequested })
      }
    fetch(url, headers)
      .then((res) => res.json())
      .then((data) => {
        setChartData(data)
        setChart(<LineChart chartData={data}/>)
        setUpDown(() => {return (data.forecasted >= 0.5) ? 'UP' : 'DOWN'})
        setUpDownBG(() => {return (data.forecasted >= 0.5) ? 'bg-green-500' : 'bg-red-500'})
        console.log('Chart set.')
      })
      .catch((err) => {console.log(err.message)})
  }

  const getMetrics = async (hoursRequested:Number) => {
    const url = 'https://wni1mr4idl.execute-api.us-west-2.amazonaws.com/Alpha/accuracy-v2/'
    const headers = {
        method: 'POST',
        body: JSON.stringify({ hours: hoursRequested })
      }
    fetch(url, headers)
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data)
      })
      .catch((err) => {console.log(err.message)})
  }

  return (mounted) ? (
    <div className='flex flex-col place-content-center place-items-center justify-items-stretch gap-7'>
      <UpDown upDownBG={upDownBG}>
        {upDown}
      </UpDown>
      <div className='flex flex-auto flex-wrap w-fit sm:w-full gap-7'>
        <div className='grow min-w-96 p-5 w-8/10 max-w-4xl bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl'>
          <div className='flex flex-col'>
            <div className='h-full flex flex-col place-content-center place-items-center mt-5 gap-5'>
              <div className='text-center font text-xl sm:text-2xl font-bold'>
                UpDown Indicator History:
              </div>
              <div className='container h-[350px] w-[95%] mt-3'>
                {chart}
              </div>
            </div>
            <div className='grow self-center grid grid-flow-col gap-5 m-5 max-w-xs'>
              <Button
                height = '35px'
                onClick = {() => {
                  getForecast(25)
                  getMetrics(25)
                }}
                width = '75px'
                textSize = 'text-xs'
                > {'1 Day'} </Button>
              <Button
                height = '35px'
                onClick = {() => {
                  getForecast(169)
                  getMetrics(169)
                }}
                width = '75px'
                textSize = 'text-xs'
                > {'7 Day'} </Button>
              <Button
                height = '35px'
                onClick = {() => {
                  getForecast(721)
                  getMetrics(721)
                }}
                width = '75px'
                textSize = 'text-xs'
              > {'30 Day'} </Button>
            </div>
          </div>
        </div>
        <div className='grow w-32 p-5 min-w-min bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl'>
          <Metrics metrics={metrics}/>
        </div>
      </div>
      <Calculator metrics={metrics} />
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default ChartBlock
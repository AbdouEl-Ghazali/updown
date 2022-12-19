import React from 'react'
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import LineChart from './LineChart';
import Button from './Button';
import Metrics from './Metrics';
import UpDown from './UpDown';
import { GetServerSideProps } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';

// interface Props {
//   forecastData: Forecast
// }

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
  correct: number;
  incorrect: number;
  total: number;
  data: {
      forecasted: any;
      price_close: any;
      correct: any;
  };
}

const getForecast = async (rowsRequested:Number) => {
  const url = 'https://wni1mr4idl.execute-api.us-west-2.amazonaws.com/Alpha/forecast/'
  const headers = {
      method: 'POST',
      body: JSON.stringify({ rows: rowsRequested })
    }

  const res = fetch(url, headers)
  return (await res).json()
}

const getMetrics = async (hoursRequested:Number) => {
  const url = 'https://wni1mr4idl.execute-api.us-west-2.amazonaws.com/Alpha/accuracy/'
  const headers = {
      method: 'POST',
      body: JSON.stringify({ hours: hoursRequested })
    }

  const res = fetch(url, headers)
  return (await res).json()
}

// export const getServerSideProps: GetServerSideProps = async() => { 
//   const response = await getForecast(7)

//   return {
//     props: {
//       forecastData: response.json()
//     }
//   }

// }

const ChartBlock = () => {
  const [mounted, setMounted] = useState(false) 
  const [chartData, setChartData] = useState({} as Forecast)
  const [metrics, setMetrics] = useState({} as Metrics)
  const [upDown, setUpDown] = useState('' as String)
  const [upDownBG, setUpDownBG] = useState('' as String)

  useEffect(() => {
    if (!mounted) {
      const res1 = getForecast(25) as Promise<Forecast> // 25 because the last entry is a forecast
      const res2 = getMetrics(24) as Promise<Metrics>
      res1.then((value) => {
        if(Object.keys(value).length > 0) {
          setChartData(value)
          setUpDown(() => {return (chartData.forecasted >= 0.5) ? 'UP' : 'DOWN'})
          setUpDownBG(() => {return (chartData.forecasted >= 0.5) ? 'bg-green-500' : 'bg-red-500'})
          setMounted(true)
        }
      })
      res2.then((value) => {
        if(Object.keys(value).length > 0) {
          setMetrics(value)
        }
      })
    }
  }, [chartData, metrics, mounted])

  // if (!mounted) return null

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
                Forecasting History:
              </div>
              <LineChart chartData={chartData}/>
            </div>
            <div className='grow self-center grid grid-flow-col gap-5 m-5 max-w-xs'>
              <Button
                height = '35px'
                onClick = {() => {
                  const res1 = getForecast(25) as Promise<Forecast>
                  const res2 = getMetrics(24) as Promise<Metrics>
                  res1.then((value) => setChartData(value))
                  res2.then((value) => setMetrics(value))
                }}
                width = '75px'
                textSize = 'text-xs'
                > {'1 Day'} </Button>
              <Button
                height = '35px'
                onClick = {() => {
                  const res1 = getForecast(169) as Promise<Forecast>
                  const res2 = getMetrics(168) as Promise<Metrics>
                  res1.then((value) => setChartData(value))
                  res2.then((value) => setMetrics(value))
                }}
                width = '75px'
                textSize = 'text-xs'
                > {'7 Day'} </Button>
              <Button
                height = '35px'
                onClick = {() => {
                  const res1 = getForecast(721) as Promise<Forecast>
                  const res2 = getMetrics(720) as Promise<Metrics>
                  res1.then((value) => setChartData(value))
                  res2.then((value) => setMetrics(value))
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
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default ChartBlock
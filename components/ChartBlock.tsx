import React from 'react'
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import LineChart from './LineChart';
import Button from './Button';
import Metrics from './Metrics';
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

  useEffect(() => {
    if (!mounted) {
      const res1 = getForecast(24) as Promise<Forecast>
      const res2 = getMetrics(24) as Promise<Metrics>
      res1.then((value) => {
        if(Object.keys(value).length > 0) {
          setChartData(value)
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
    
    <div className='flex flex-auto flex-wrap gap-5'>
      <div className='grow w-128 min-w-96 p-5 bg-zinc-100 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl'>
        <div className='flex flex-col'>
          <div className=''>
            <LineChart chartData={chartData}/>
          </div>
          <div className='grow self-center grid grid-flow-col gap-5 m-5 max-w-xs'>
            <Button
              height = '35px'
              onClick = {() => {
                const res1 = getForecast(24) as Promise<Forecast>
                const res2 = getMetrics(24) as Promise<Metrics>
                res1.then((value) => setChartData(value))
                res2.then((value) => setMetrics(value))
              }}
              width = '75px'
              children = '1 Day'
              textSize = 'text-xs'
            />
            <Button
              height = '35px'
              onClick = {() => {
                const res1 = getForecast(168) as Promise<Forecast>
                const res2 = getMetrics(168) as Promise<Metrics>
                res1.then((value) => setChartData(value))
                res2.then((value) => setMetrics(value))
              }}
              width = '75px'
              children = '7 Day'
              textSize = 'text-xs'
            />
            <Button
              height = '35px'
              onClick = {() => {
                const res1 = getForecast(720) as Promise<Forecast>
                const res2 = getMetrics(720) as Promise<Metrics>
                res1.then((value) => setChartData(value))
                res2.then((value) => setMetrics(value))
              }}
              width = '75px'
              children = '30 Day'
              textSize = 'text-xs'
            />
          </div>
        </div>
      </div>
      <div className='grow w-32 min-w-96 p-5 bg-zinc-100 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl'>
        <Metrics metrics={metrics}/>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default ChartBlock
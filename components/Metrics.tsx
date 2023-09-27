import React from 'react'
import { useState, useEffect } from 'react';
import Metric from './Metric';

const Metrics = ({metrics}: any) => {
  const forecasted: number = Math.round(metrics.forecasted * 100)
  const upSignals: Number = metrics.upSignals
  const downSignals: Number = metrics.downSignals
  const total: Number = metrics.total
  const ratio: Number = Math.round(+upSignals / +total * 100)

  const upColor = 'border-green-500'
  const downColor = 'border-red-500'
  const totalColor = 'border-slate-500'
  const forecastColor = 'border-blue-700'

  const sentiment = (() => {return (forecasted > 70) ? 'BULLISH' : (forecasted < 30) ? 'BEARISH' : 'NEUTRAL'})
  const sentimentColor = (() => {return (forecasted > 70) ? upColor : (forecasted < 30) ? downColor : totalColor})
  const sentimentStrength = (() => {return (forecasted >= 50) ? forecasted : 100 - +forecasted})

  return (
    <div className='h-full flex flex-col place-content-center mt-5 gap-5'>
      <div className='text-center font text-xl sm:text-2xl font-bold'>
        Metrics:
      </div>
      <div className='flex flex-auto flex-wrap place-content-center place-items-center min-w-min gap-5 mb-5 font text-sm sm:text-base text-center'>
          <Metric metric={'Up Signals'} color={upColor}> 
            {upSignals}
          </Metric>
          <Metric metric={'Down Signals'} color={downColor}> 
            {downSignals}
          </Metric>
          <Metric metric={'Current Confidence'} color={totalColor}> 
            {sentimentStrength()}%
          </Metric>
          <div className={`border-b-4 ${sentimentColor()} grid justify-items-center place-items-center mx-5 w-full max-w-xs min-w-[250px] h-24 rounded-xl bg-zinc-200 bg-opacity-50 dark:bg-zinc-700`}>
              <div className={`flex justify-center place-items-center font text-2xl font-bold w-4/6 h-4/6 text-center rounded-xl`}>
                  <div>
                    {sentiment()}
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Metrics
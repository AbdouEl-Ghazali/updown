import React from 'react'
import { useState, useEffect } from 'react';
import Metric from './Metric';

const Metrics = ({metrics}: any) => {
  const forecasted: Number = Math.round(metrics.forecasted * 100)
  const upSignals: Number = metrics.upSignals
  const downSignals: Number = metrics.downSignals
  const total: Number = metrics.total
  const ratio: Number = Math.round(+upSignals / +total * 100)

  const upColor = 'bg-green-500'
  const downColor = 'bg-red-500'
  const totalColor = 'bg-slate-500'
  const forecastColor = 'bg-blue-700'

  const sentiment = (() => {return (forecasted > 60) ? 'BULLISH' : (forecasted < 40) ? 'BEARISH' : 'NEUTRAL'})
  const sentimentColor = (() => {return (forecasted > 60) ? upColor : (forecasted < 40) ? downColor : totalColor})
  const sentimentStrength = (() => {return (forecasted >= 50) ? forecasted : 100 - +forecasted})

  return (
    <div className='h-full flex flex-col place-content-center mt-5 gap-5'>
      <div className='text-center font text-xl sm:text-2xl font-bold'>
        Metrics:
      </div>
      <div className='flex flex-auto flex-wrap place-content-center place-items-center min-w-min gap-5 mb-5 font text-sm sm:text-base text-center'>
          <Metric metric={'Ups'} color={upColor}> 
            {upSignals}
          </Metric>
          <Metric metric={'Downs'} color={downColor}> 
            {downSignals}
          </Metric>
          <Metric metric={'Signal Confidence'} color={totalColor}> 
            {sentimentStrength()}%
          </Metric>
          <div className={`grid justify-items-center place-items-center w-full max-w-xs min-w-[250px] h-24 rounded-xl bg-zinc-200 bg-opacity-50 dark:bg-zinc-700`}>
              <div className={`flex justify-center place-items-center font text-2xl font-bold text-white w-4/6 h-4/6 text-center ${sentimentColor()} rounded-xl bg-opacity-${sentimentStrength()}`}>
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
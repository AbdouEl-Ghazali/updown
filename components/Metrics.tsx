import React from 'react'
import { useState, useEffect } from 'react';
import Metric from './Metric';

const Metrics = ({metrics}: any) => {
  const correct: Number = metrics.correct
  const incorrect: Number = metrics.incorrect
  const total: Number = metrics.total

  const correctColor = 'bg-green-500'
  const incorrectColor = 'bg-red-500'
  const totalColor = 'bg-slate-500'
  const forecastColor = 'bg-blue-700'

  return (
    <div className='h-full flex flex-col place-content-center mt-5 gap-5'>
      <div className='text-center font text-xl sm:text-2xl font-bold'>
        Metrics:
      </div>
      <div className='flex flex-auto flex-wrap place-content-center place-items-center min-w-min gap-5 mb-5 font text-sm sm:text-base text-center'>
          <Metric metric={'Correct'} color={correctColor}> 
            {correct}
          </Metric>
          <Metric metric={'Incorrect'} color={incorrectColor}> 
            {incorrect}
          </Metric>
          <Metric metric={'Total'} color={totalColor}> 
            {total}
          </Metric>
          <Metric metric={'Accuracy'} color={forecastColor}> 
            {Math.round((correct as number)/(total as number) * 100)}%
          </Metric>
      </div>
    </div>
  )
}

export default Metrics
import React from 'react'
import { useState, useEffect } from 'react';

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
      <div className='text-center font text-md sm:text-2xl font-bold'>
        Metrics:
      </div>
      <div className='flex flex-auto flex-wrap place-content-center place-items-center min-w-min gap-5 mb-5 font text-sm sm:text-md text-center'>
          <div className={`flex place-content-center place-items-center w-full max-w-xs min-w-[200px] h-24 rounded-xl ${correctColor}`}>
              <div className='font text-2xl font-bold text-white'>
                  Correct: {`${correct}`}
              </div>
          </div>
          <div className={`flex place-content-center place-items-center w-full max-w-xs min-w-[200px] h-24 rounded-xl ${incorrectColor}`}>
              <div className='font text-2xl font-bold text-white'>
                Incorrect: {`${incorrect}`}
              </div>
          </div>
          <div className={`flex place-content-center place-items-center w-full max-w-xs min-w-[200px] h-24 rounded-xl ${totalColor}`}>
              <div className='font text-2xl font-bold text-white'>
                Total: {`${total}`}
              </div>
          </div>
          <div className={`flex place-content-center place-items-center w-full max-w-xs min-w-[200px] h-24 rounded-xl ${forecastColor}`}>
              <div className='font text-2xl font-bold text-white'>
                Accuracy: {`${Math.round((correct as number)/(total as number) * 100)}%`}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Metrics
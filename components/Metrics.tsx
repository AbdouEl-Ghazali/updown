import React from 'react'
import { useState, useEffect } from 'react';

const Metrics = ({metrics}: any) => {
  const correct: Number = metrics.correct
  const incorrect: Number = metrics.incorrect
  const total: Number = metrics.total
  return (
    <div className='flex flex-col justify-around justify-self-stretch'>
      <div className='text-center text-3xl m-5'>
        Metrics
      </div>
      <div className='grid gap-5 text-md text-center'>
          <div>
            Correct: {`${correct}`}
          </div>
          <div>
            Incorrect: {`${incorrect}`}
          </div>
          <div>
            Total: {`${total}`}
          </div>
          <div>
            Accuracy: {`${Math.round((correct as number)/(total as number) * 100)}%`}
          </div>
      </div>
    </div>
  )
}

export default Metrics
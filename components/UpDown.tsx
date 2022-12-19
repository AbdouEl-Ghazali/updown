import React, { Children } from 'react'

interface UpDown {
    upDownBG: String
}

const UpDown = ({upDownBG, children}: any) => {
  return (
    <div className='flex flex-auto w-full justify-center'>
        <div className={`flex flex-col sm:flex-row gap-5 p-5 w-full justify-center sm:justify-between place-items-center bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl`}>
            <div className='flex flex-col w-full sm:w-1/2 gap-5 py-5 sm:pl-5 text-justify sm:text-left '>
                <div className='font text-xl text-center sm:text-justify sm:text-2xl font-bold'>
                    Current prediction:
                </div>
                <div className='font text-sm sm:text-md'>
                    The UpDown algorithm predicts hourly Bitcoin price-action using a state of the art neural network trained on over 5 years of data. The current prediction is that Bitcoin will go {children.toLowerCase()} in price by the next hour&apos;s close.
                </div>
                <div className='font text-sm sm:text-md text-left'>
                    WARNING! This forecasting tool is for educational purposes only.
                </div>
            </div>
            <div className={`flex place-content-center place-items-center w-full sm:w-[30%] h-24 sm:h-32 shrink-0 rounded-xl ${upDownBG}`}>
                <div className='font text-2xl font-bold text-white'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpDown
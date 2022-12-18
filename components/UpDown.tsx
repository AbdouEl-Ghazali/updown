import React, { Children } from 'react'

interface UpDown {
    upDownBG: String
}

const UpDown = ({upDownBG, children}: any) => {
    console.log(upDownBG)
  return (
    <div className='flex flex-auto w-full justify-center'>
        <div className={`flex flex-row gap-5 p-5 max-w-fit justify-center place-items-center bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl`}>
            <div className='flex flex-col w-1/2 gap-5 py-5 pl-5'>
                <div className='font text-md sm:text-2xl font-bold'>
                    Current prediction:
                </div>
                <div className='font text-sm sm:text-md'>
                    The UpDown algorithm predicts hourly price-action for Bitcoin.
                </div>
            </div>
            <div className={`flex place-content-center place-items-center w-32 h-32 shrink-0 rounded-xl ${upDownBG}`}>
                <div className='font text-2xl font-bold text-white'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpDown
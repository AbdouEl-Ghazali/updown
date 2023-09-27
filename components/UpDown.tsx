import React, { Children } from 'react'

interface UpDown {
    upDownBG: String
}

const UpDown = ({upDownBG, children}: any) => {
    const fontSizer = () => {return (children == 'UP')? 'text-5xl' : 'text-3xl'}
    const fontSize = fontSizer()
    return (
    <div className='flex flex-auto w-full justify-center'>
        <div className={`flex flex-col sm:flex-row gap-5 p-5 w-full justify-center sm:justify-between place-items-center bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl`}>
            <div className='flex flex-col w-full sm:w-1/2 sm:ml-5 gap-5 py-5 sm:pl-5 text-justify sm:text-left '>
                <div className='font text-xl text-center sm:text-justify sm:text-2xl font-bold'>
                    Current indicator:
                </div>
                <div className='font text-sm sm:text-base'>
                    The UpDown algorithm predicts Bitcoin&apos;s price-action using a state of the art neural network trained on over 5 years of data. 
                    Currently, the indicator is signaling that Bitcoin will go {children.toLowerCase()} in price in the medium term. 
                    Signals are created at the beginning of the hour, and are typically released within 3 minutes.
                </div>
                <div className='font text-sm sm:text-base text-left'>
                    WARNING! This forecasting tool is for educational purposes only.
                </div>
            </div>
            <div className={`border-b-4 ${upDownBG} flex place-content-center place-items-center w-full sm:w-[30%] sm:mr-10 h-24 sm:h-32 shrink-0 rounded-xl bg-zinc-200 bg-opacity-50 dark:bg-zinc-700`}>
                <div className={`font ${fontSize} font-bold`}>
                    {children}
                </div>
            </div>
        </div>
    </div>
    )
}

export default UpDown
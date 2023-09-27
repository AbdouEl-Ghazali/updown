import React from 'react'

const Metric = ({metric, color, children}: any) => {
  return (
    <div className={`border-b-4 ${color} grid grid-cols-2 justify-items-start place-items-center mx-5 pl-10 gap-10 w-full max-w-xs min-w-[250px] h-24 rounded-xl bg-zinc-200 bg-opacity-50 dark:bg-zinc-700`}>
        <div className='font text-lg text-left font-bold'>
            {metric}:
        </div>
        <div className={`flex justify-center place-items-center font text-2xl font-bold w-16 h-16 text-center rounded-xl`}>
            <div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Metric
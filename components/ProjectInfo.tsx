import React from 'react'
import Image from 'next/image'
import DALLEArt from '../public/DALLEArt.png'

const ProjectInfo = () => {
  return (
    <div className='flex flex-col place-content-center place-items-center justify-items-stretch gap-7'>
      <div className='flex flex-auto flex-wrap w-fit sm:w-full gap-7'>
        <div className='flex flex-col sm:flex-row gap-5 p-5 w-full justify-center sm:justify-around place-items-center bg-zinc-200 bg-opacity-50 dark:bg-zinc-700 dark:bg-opacity-50 rounded-xl'>
            <div className={`flex place-content-center place-items-center sm:w-[40%]  overflow-clip rounded-xl`}>
                <Image src={DALLEArt} alt='Tara Winstead Stock Photo' />
            </div>
            <div className='flex flex-col w-full sm:w-1/2 gap-5 py-5 sm:pl-5 text-justify sm:text-left '>
                <div className='font text-xl text-center sm:text-justify sm:text-2xl font-bold'>
                    Project Information:
                </div>
                <div className='font text-sm sm:text-md'>
                    Neural networks can be used to forecast Bitcoin&apos;s price-action by learning from historical price data and using that knowledge to make predictions about future price movement. 
                    The UpDown model was built on over 5 years of Bitcoin&apos;s historical data infused with feature engineering of technical signals.
                    It was trained to make predictions on future price-action. 
                    UpDown&apos;s prediction accuracy was achieved by continually updating the model with new data, engineering new training features, and fine-tuning the training parameters.
                    The end result is a closed loop, robust model that holds up against live data pipelines existing on the AWS cloud.
                </div>
                <div className='font text-sm sm:text-md'>
                    Although the quoted accuracy of this tool may not appear to be high, in the world of trading you only have to be correct slightly over 50&#37; of the time to break even.
                    Trading fees account for less than 1&#37; overall.
                    Anything beyond that is considered profit, which means the accuracy of this tool, so long as it stays above 51&#37;, is statistically remarkable!
                </div>
    
                <div className='font text-xl text-center sm:text-justify sm:text-2xl font-bold'>
                    Disclaimer:
                </div>
                <div className='font text-sm sm:text-md'>
                    This tool is provided for informational and educational purposes only and is not intended to be relied upon as a source of information when making financial decisions. 
                    The creator of the tool is not responsible for any errors or omissions or for any actions taken by the user based on the information provided by the tool. 
                    The tool is provided &ldquo;as is&rdquo; and the creator of the tool cannot be held liable for how users choose to use the tool.
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo
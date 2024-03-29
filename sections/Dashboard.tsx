import React from 'react'
import Darkmode from '../components/Darkmode'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import logoSVG from '../public/logoSVG.svg'

const Dashboard = () => {

  return (
    <div>
      {/* <div className='text-center text-white px-5 py-1 bg-blue-900'>
        September 27th - Calculator improvements including trade optimization!
      </div> */}
      <div className='flex justify-between place-items-center px-5 py-1 bg-zinc-100 dark:bg-zinc-800'>
        <div className='flex flex-row justify-center place-items-center gap-1'>
          <Image src={logoSVG} alt="UpDown Logo" width={50} height={50} />
          <div className={'text-md tracking-wider font-semibold text-center'}>
            U.D. Market Analytics
          </div>
        </div>
        <div>
          <Darkmode/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
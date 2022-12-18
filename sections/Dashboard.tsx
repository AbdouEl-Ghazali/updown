import React from 'react'
import Darkmode from '../components/Darkmode'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Dashboard = () => {

  return (
    <div className='flex justify-between place-items-center px-5 py-1 bg-zinc-100 dark:bg-zinc-800'>
      <div className='flex flex-row justify-center place-items-center gap-1'>
        <Image src={'/logoSVG.svg'} alt="UpDown Logo" width={50} height={50} />
        <h1>
          UpDown
        </h1>
      </div>
      <div>
        <Darkmode/>
      </div>
    </div>
  )
}

export default Dashboard
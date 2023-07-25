import React from 'react'
import Darkmode from '../components/Darkmode'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import logoSVG from '../public/logoSVG.svg'

const Dashboard = () => {

  return (
    <div>
      <div className='text-center text-white px-5 py-1 bg-blue-900'>
        July 24th - Take profit function added to the calculator!
      </div>
      <div className='flex justify-between place-items-center px-5 py-1 bg-zinc-100 dark:bg-zinc-800'>
        <div className='flex flex-row justify-center place-items-center gap-1'>
          <Image src={logoSVG} alt="UpDown Logo" width={50} height={50} />
          <h1>
            UpDown
          </h1>
        </div>
        <div>
          <Darkmode/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
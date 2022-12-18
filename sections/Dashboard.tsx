import React from 'react'
import Darkmode from '../components/Darkmode'
import styles from '../styles/Home.module.css'

const Dashboard = () => {

  return (
    <div className='flex justify-between place-items-center px-5 py-1 bg-zinc-100 dark:bg-zinc-800'>
      <div className='flex flex-row justify-center place-items-center gap-1'>
        <img style={{ width: 50, height: 50 }} src={'./public/logoSVG.svg"'} alt="UpDown Logo" />
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
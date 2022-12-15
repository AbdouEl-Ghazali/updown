import React from 'react'
import Darkmode from '../components/Darkmode'
import styles from '../styles/Home.module.css'

const Dashboard = () => {

  return (
    <div className='container mx-auto px-10 py-5 flex justify-between'>
      {/* Icon */}
      <h1>
        UpDown
      </h1>
      <div>
        <Darkmode/>
      </div>
    </div>
  )
}

export default Dashboard
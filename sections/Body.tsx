import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ChartBlock from '../components/ChartBlock';
import Metrics from '../components/Metrics';

const Body = () => {
  return (
    <main className='container mx-auto px-10 py-10 space-y-10 flex flex-col justify-around align-center'>
      <h1 className={styles.title}>
        Bitcoin, up or down?
      </h1>
      <div className='flex flex-row flex-wrap justify-around align-center'>
        <ChartBlock/>
        <Metrics/>
      </div>
    </main>
  )
}

export default Body
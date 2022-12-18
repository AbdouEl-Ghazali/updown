import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ChartBlock from '../components/ChartBlock';

const Body = () => {
  return (
    <main className='container mx-auto px-10 py-10 space-y-10 flex flex-col justify-around align-center max-w-screen-xl'>
      <h1 className={styles.title}>
        Bitcoin, up or down?
      </h1>
      <ChartBlock />
    </main>
  )
}

export default Body
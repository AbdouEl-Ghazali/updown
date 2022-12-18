import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ChartBlock from '../components/ChartBlock';

const Body = () => {
  return (
    <main className='container mx-auto px-5 py-10 gap-5 gap-y-10 sm:p-10 sm:gap-10 flex flex-col justify-around align-center max-w-screen-xl'>
      <div className={'text-2xl sm:text-5xl text-center'}>
        Powered by Deep Learning.
      </div>
      <ChartBlock />
    </main>
  )
}

export default Body
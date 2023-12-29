import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from '../sections/Dashboard'
import Body from '../sections/Body'
import Footer from '../sections/Footer'
import Head from 'next/head'
import { useEffect } from 'react';
import { initializeGoogleTagManager } from '../components/GoogleTag'

export default function Home() {
  useEffect(() => {
    // Initialize Google Tag manager
    initializeGoogleTagManager('G-57B6E619D4')
  }, []);

  return (
    <div>
      <Head>
        <title>UpDown</title>
        <meta name="description" content="Bitcoin up or down? Deep Learning powered BTC Forecasting Algorithm" />
        <link rel="icon" href={'./logoSVG.svg'} />
      </Head>
      
      <Dashboard/>
      <Body/>
      <Footer/>
    </div>
  )
}

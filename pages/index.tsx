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
    initializeGoogleTagManager('GTM-PV3Q45KB')
  }, []);

  return (
    <div>
      <Head>
        <title>UpDown</title>
        <meta name="description" content="Bitcoin up or down? Deep Learning powered BTC Forecasting Algorithm" />
        <link rel="icon" href={'./logoSVG.svg'} />
      </Head>

      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PV3Q45KB" height="0" width="0" style={{display:"none", visibility:"hidden"}}></iframe>
      </noscript>
      
      <Dashboard/>
      <Body/>
      <Footer/>
    </div>
  )
}

import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from '../sections/Dashboard'
import Body from '../sections/Body'
import Footer from '../sections/Footer'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>UpDown</title>
        <meta name="description" content="Bitcoin up or down? Deep Learning powered BTC Forecasting Algorithm" />
        <link rel="icon" href="./public/logoSVG.svg" />
      </Head>
      
      <Dashboard/>
      <Body/>
      <Footer/>
    </div>
  )
}

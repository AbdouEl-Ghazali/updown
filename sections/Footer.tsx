import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import logoSVG from '../public/logoSVG.svg'


const Footer = () => {
  return (
    <footer className={styles.footer}>
        <a
          href="https://github.com/AbdouEl-Ghazali"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by {' '}
          <Image src={logoSVG} alt="UpDown Logo" width={50} height={50} />
        </a>
      </footer>
  )
}

export default Footer
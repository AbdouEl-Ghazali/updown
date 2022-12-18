import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'


const Footer = () => {
  return (
    <footer className={styles.footer}>
        <a
          href="https://github.com/AbdouEl-Ghazali"
          target="_blank"
          rel="noopener noreferrer"
        >
          Project by{' '}
          <span className={styles.logo}>
            <Image src="/logoSVG.svg" alt="UpDown Logo" width={50} height={50} />
          </span>
        </a>
      </footer>
  )
}

export default Footer
import React from 'react'
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart } from './LineChart';

const ChartBlock = () => {
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  // if (!mounted) return null

  return (
    <LineChart />
  )
}

export default ChartBlock
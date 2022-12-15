import React from 'react'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const Darkmode = () => {
    const {systemTheme, theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
  
    useEffect(() => {
      setMounted(true)
    }, [])
  
    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
    return (
        <SunIcon className='w-7 h-7' role='button' onClick={() => setTheme ('light')} />
    )
    }
    else {
    return (
        <MoonIcon className='w-7 h-7' role='button' onClick={() => setTheme ('dark')} />
    )
    }
}

export default Darkmode
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Forecast } from './ChartBlock';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import { useTheme } from 'next-themes';

export const prepData = (chartData: Forecast, currentTheme : any) => {
  const gridLine: String = '#e6e6e6'
  const gridLineDark: String = '#404040'
  const tickColor: String = '#1a1a1a'
  const tickColorDark: String = '#f2f2f2'
  const lineColor: String = '#b3b3e6'
  const lineColorDark: String = '#5353c6'
  const correctColor: String = '#00ff99'
  const incorrectColor: String = 'red'
  const forecastColor: String = 'blue'


  const forecast: Number[] = Object.values(chartData.data.forecasted)
  const actual: Number[] = Object.values(chartData.data.actual)
  const keys: any[] = Object.keys(chartData.data.price_close)
  const len: Number = Object.values(forecast).length // Number of datapoints
  const labels = keys.map(value => value)

  var priceClose: Number[] = Object.values(chartData.data.price_close) // Adjusting 'price_close' for forecast
  priceClose = priceClose.map((value, index): any => {
    return  (value === null && forecast[index] >= 0.5) ? (+priceClose[index - 1] + +5) : 
            (value === null && forecast[index] < 0.5) ? (+priceClose[index - 1] - +5) : 
            value // Otherwise return value
  })

  const forecastColors: String[] = forecast.map((value, index) => {
    const actualTemp: Number = actual[index]
    return (
      value < 0.5 && actualTemp == 0 ||
      value >= 0.5 && actualTemp == 1
    ) ? correctColor : 
    (actual[index] === null) ? forecastColor : incorrectColor;  // draw bad predictions in red, draw good predictions in green
  })
  
  const rotation = forecast.map((value) => {
    return (value < 0.5) ? 180 :  // draw triangle down
            0;    // draw triangle up
  })

  const prepped = {
    labels,
    datasets: [
      {
        data: priceClose,
        borderColor: (() => {return (currentTheme === 'dark') ? lineColorDark : lineColor}),
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointStyle: (() => {return (len < 30) ? 'triangle' : 'circle'}),
        rotation: rotation,
        pointRadius: (() => {return (len < 30) ? 5 : 2}),
        borderWidth: (() => {return (len < 30) ? 5 : 1}),
        pointHoverRadius: (() => {return (len < 30) ? 10 : 5}),
        pointBorderColor:  forecastColors,
        pointBackgroundColor:  forecastColors
      },
    ],
  }
  const options = {
    scales: {
      x: {
        type: "time",
        ticks: {
            maxRotation: 50,
            maxTicksLimit: len,
            color: (() => {return (currentTheme === 'dark') ? tickColorDark : tickColor})
        },
        grid: {
          color: (() => {return (currentTheme === 'dark') ? gridLineDark : gridLine})
        },
      },
      y: {
        ticks: {
          color: (() => {return (currentTheme === 'dark') ? tickColorDark : tickColor})
        },
        grid: {
          color: (() => {return (currentTheme === 'dark') ? gridLineDark : gridLine})
        },
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      // title: {
      //   display: true,
      //   text: 'Forecasting History',
      //   color: (() => {return (currentTheme === 'dark') ? tickColorDark : tickColor})
      // },
    },
  };
  return ({prepped, options})
}

const LineChart  = ({chartData}: any) => {
  const {systemTheme, theme, setTheme} = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  
  const prep = prepData(chartData, currentTheme)
  return (<Line options={prep.options as any} data={prep.prepped as any} className='grow'/>)
}
export default LineChart;
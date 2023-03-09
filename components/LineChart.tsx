import React from 'react';
import { Line } from 'react-chartjs-2';
import type { Forecast } from './ChartBlock';
import { enUS } from 'date-fns/locale';
import { useTheme } from 'next-themes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TooltipItem
} from 'chart.js';
import 'chartjs-adapter-date-fns';

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

export const prepData = (chartData: Forecast, currentTheme : any) => {
  const gridLine: String = '#e6e6e6'
  const gridLineDark: String = '#404040'
  const tickColor: String = '#1a1a1a'
  const tickColorDark: String = '#f2f2f2'
  const lineColor: String = '#b3b3e6'
  const lineColorDark: String = '#5353c6'
  const pointColor: String = 'rgba(150, 150, 255, 0)'
  const upColor: String = '#00ff99'
  const downColor: String = '#ff0000'
  const forecastColor: String = 'blue'


  const forecast: Number[] = Object.values(chartData.data.forecasted)
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
    return (value >= 0.5) ? upColor : 
          (value < 0.5) ? downColor :
                            forecastColor;  // draw bad predictions in red, draw good predictions in green, forecast in blue
  })

  const rotation = forecast.map((value) => {
    return (value < 0.5) ? 180 :  // draw triangle down
            0;    // draw triangle up
  })

  var upData = forecastColors.map((value, index) => {return (value == upColor)? priceClose[index] : null}) // Create up data
  upData = upData.map((value, index) => {return (upData[index - 1] !== null) ? null : upData[index]}) // Hide repetitive up data
  var downData = forecastColors.map((value, index) => {return (value == downColor)? priceClose[index] : null}) // Create down data
  downData = downData.map((value, index) => {return (downData[index - 1] !== null) ? null : downData[index]}) // Hide repetitive down data
  var forecastData = forecastColors.map((value, index) => {return (value == forecastColor)? priceClose[index] : null}) // Create forecast data

  const pointStyle = (() => {return (len < 200) ? 'triangle' : 'circle'})
  const pointSize = (() => {return (len < 30) ? 5 : (len < 200) ? 3 : 1})
  const pointHoverSize = (() => {return (len < 200) ? 10 : 5})
  const prepped = {
    labels,
    datasets: [
      {
        label: 'Up',
        data: upData,
        backgroundColor: upColor,
        pointStyle: pointStyle,
        rotation: rotation,
        pointRadius: pointSize,
        borderWidth: pointSize,
        pointHoverRadius: pointHoverSize,
        pointBorderColor:  upColor,
        pointBackgroundColor:  upColor,
        showLine: false 
      },
      {
        label: 'Down',
        data: downData,
        backgroundColor: downColor,
        pointStyle: pointStyle,
        rotation: rotation,
        pointRadius: pointSize,
        borderWidth: pointSize,
        pointHoverRadius: pointHoverSize,
        pointBorderColor:  downColor,
        pointBackgroundColor:  downColor,
        showLine: false 
      },
      {
        label: 'Forecast',
        data: forecastData,
        backgroundColor: forecastColor,
        pointStyle: pointStyle,
        rotation: rotation,
        pointRadius: pointSize,
        borderWidth: pointSize,
        pointHoverRadius: pointHoverSize,
        pointBorderColor:  forecastColors,
        pointBackgroundColor:  forecastColors,
        showLine: false 
      },
      {
        label: 'BTC Price',
        data: priceClose,
        backgroundColor: (() => {return (currentTheme === 'dark') ? lineColorDark : lineColor}),
        borderColor: (() => {return (currentTheme === 'dark') ? lineColorDark : lineColor}),
        pointBackgroundColor: pointColor,
        pointBorderColor: pointColor,
        pointRadius: pointSize,
        borderWidth: pointSize,
        pointHoverRadius: pointHoverSize,
        tension: 0.1
      },
      {
        label: 'Prediction',
        data: rotation.map((value) => {return (value == 180)? 'DOWN' : 'UP'}),
        hidden: true
      },
      // {
      //   label: 'Result',
      //   data: forecastColors.map((value) => {return (value == upColor)? 'Up' : (value == downColor)? 'Down' : 'TBD'}),
      //   hidden: true
      // },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode: 'index',
      axis: 'x',
      intersect: false,
    },
    // interaction: {
    //   mode: 'index',
    //   axis: 'x'
    // },
    scales: {
      x: {
        type: "time",
        ticks: {
            maxRotation: 0,
            maxTicksLimit: 5,
            color: (() => {return (currentTheme === 'dark') ? tickColorDark : tickColor})
        },
        grid: {
          color: (() => {return (currentTheme === 'dark') ? gridLineDark : gridLine})
        },
      },
      y: {
        title: {
          display: true,
          align: 'center',
          text: 'BTC Price'
        },
        ticks: {
          display: true,
          maxTicksLimit: 10,
          color: (() => {return (currentTheme === 'dark') ? tickColorDark : tickColor})
        },
        grid: {
          color: (() => {return (currentTheme === 'dark') ? gridLineDark : gridLine})
        },
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          filter: (item: any, chart: any) => {
              // Logic to remove a particular legend item goes here
              return (item.text.includes('Result') || item.text.includes('Prediction')) ? false : true
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<any>, chart: any) => {
              return (tooltipItem.datasetIndex >= 3) ? prepped.datasets.slice(3,6).map(ds => ds.label + ': ' + ds.data[tooltipItem.dataIndex]) : ''
          },
          
          // (!(String(ds.label).includes('Up')) ||
          // !(String(ds.label).includes('Down')) ||
          // !(String(ds.label).includes('Forecast'))
          // ) ? 
        },
        filter: (tooltipItem: any, chart: any) => {
          // Logic to remove a particular legend item goes here
            var datasetLabel: any = prepped.datasets[tooltipItem.datasetIndex];
            var datapointLabel: any = prepped.labels[tooltipItem.index];
            var datapointValue: any = prepped.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

              //you can also use tooltipItem.xlabel or ylabel to get datapoint label and value but here it depends on you chart orientation                

              if (datasetLabel=='Up') {
                  return false;
              } else {
                  return true;
              }
          // return (tooltipItem.text.includes('Up') || tooltipItem.text.includes('Down') || tooltipItem.text.includes('Forecast')) ? true : false
        },
        displayColors: false,
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
  return (<Line 
    options={prep.options as any} 
    data={prep.prepped as any} 
    className=''
  />)
}
export default LineChart;
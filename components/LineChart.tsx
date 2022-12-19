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
  const correctColor: String = '#00ff99'
  const incorrectColor: String = '#ff0000'
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

  const correctData = forecastColors.map((value, index) => {return (value == correctColor)? priceClose[index] : null})
  const incorrectData = forecastColors.map((value, index) => {return (value == incorrectColor)? priceClose[index] : null})
  const forecastData = forecastColors.map((value, index) => {return (value == forecastColor)? priceClose[index] : null})

  const prepped = {
    labels,
    datasets: [
      {
        label: 'Correct',
        data: correctData,
        backgroundColor: correctColor,
        pointStyle: (() => {return (len < 30) ? 'triangle' : 'circle'}),
        rotation: rotation,
        pointRadius: (() => {return (len < 30) ? 3 : 1}),
        borderWidth: (() => {return (len < 30) ? 3 : 1}),
        pointHoverRadius: (() => {return (len < 30) ? 10 : 5}),
        pointBorderColor:  correctColor,
        pointBackgroundColor:  correctColor,
        showLine: false 
      },
      {
        label: 'Incorrect',
        data: incorrectData,
        backgroundColor: incorrectColor,
        pointStyle: (() => {return (len < 30) ? 'triangle' : 'circle'}),
        rotation: rotation,
        pointRadius: (() => {return (len < 30) ? 3 : 1}),
        borderWidth: (() => {return (len < 30) ? 3 : 1}),
        pointHoverRadius: (() => {return (len < 30) ? 10 : 5}),
        pointBorderColor:  incorrectColor,
        pointBackgroundColor:  incorrectColor,
        showLine: false 
      },
      {
        label: 'Forecast',
        data: forecastData,
        backgroundColor: forecastColor,
        pointStyle: (() => {return (len < 30) ? 'triangle' : 'circle'}),
        rotation: rotation,
        pointRadius: (() => {return (len < 30) ? 3 : 1}),
        borderWidth: (() => {return (len < 30) ? 3 : 1}),
        pointHoverRadius: (() => {return (len < 30) ? 10 : 5}),
        pointBorderColor:  forecastColors,
        pointBackgroundColor:  forecastColors,
        showLine: false 
      },
      {
        label: 'BTC Price',
        data: priceClose,
        backgroundColor: (() => {return (currentTheme === 'dark') ? lineColorDark : lineColor}),
        borderColor: (() => {return (currentTheme === 'dark') ? lineColorDark : lineColor}),
        pointRadius: (() => {return (len < 30) ? 3 : 1}),
        borderWidth: (() => {return (len < 30) ? 3 : 1}),
        pointHoverRadius: (() => {return (len < 30) ? 10 : 5}),
        tension: 0.1
      },
      {
        label: 'Prediction',
        data: rotation.map((value) => {return (value == 180)? 'DOWN' : 'UP'}),
        hidden: true
      },
      {
        label: 'Result',
        data: forecastColors.map((value) => {return (value == correctColor)? 'Correct' : (value == incorrectColor)? 'Incorrect' : 'TBD'}),
        hidden: true
      },
    ],
  }
  const options = {
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
            maxTicksLimit: 10,
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
          
          // (!(String(ds.label).includes('Correct')) ||
          // !(String(ds.label).includes('Incorrect')) ||
          // !(String(ds.label).includes('Forecast'))
          // ) ? 
        },
        filter: (tooltipItem: any, chart: any) => {
          // Logic to remove a particular legend item goes here
            var datasetLabel: any = prepped.datasets[tooltipItem.datasetIndex];
            var datapointLabel: any = prepped.labels[tooltipItem.index];
            var datapointValue: any = prepped.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

              //you can also use tooltipItem.xlabel or ylabel to get datapoint label and value but here it depends on you chart orientation                

              if (datasetLabel=='Correct') {
                  return false;
              } else {
                  return true;
              }
          // return (tooltipItem.text.includes('Correct') || tooltipItem.text.includes('Incorrect') || tooltipItem.text.includes('Forecast')) ? true : false
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
  return (<Line options={prep.options as any} data={prep.prepped as any} className='grow mt-3 sm:mt-10 mx-0 sm:mx-3'/>)
}
export default LineChart;
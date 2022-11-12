// ** MUI Imports
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#32baff',
  series5: '#ffa1a1'
}

const Tokenomics = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: ['Community', 'Core contributors', 'Foundation', 'Investors'],
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    theme: {
      monochrome: {
        enabled: true
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      shared: true
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '0.8rem'
            },
            value: {
              fontSize: '0.8rem',
              color: theme.palette.text.primary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '0.8rem',
              label: 'Community',
              formatter: () => '51.02%',
              color: theme.palette.text.primary
            }
          }
        }
      }
    }
  }

  return (
    <ReactApexcharts
      type='donut'
      height={180}
      options={options}
      series={[510_217_360, 190_000_000, 165_000_000, 134_782_640]}
    />
  )
}

export default Tokenomics

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useMemo, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

// ** Icons Imports

// ** Third Party Imports

// ** Custom Components Imports

const StatisticsCharts = ({ options, title, type }: { options?: Highcharts.Options; title: string; type?: string }) => {
  const [config, setConfig] = useState<Highcharts.Options>()

  // ** Hook
  const theme = useTheme()

  const colors = useMemo(
    () => [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    [theme]
  )

  useMemo(() => {
    if (!config && options) {
      const cfg = {
        ...options,
        colors,
        exporting: { enabled: false },
        chart: { height: 115, backgroundColor: 'transparent' }
      }
      if (cfg.series) {
        cfg.series[0].color = theme.palette.primary.main
        if (type) (cfg.series[0] as any).type = type
      }

      ;(cfg.yAxis as any).gridLineWidth = 0

      // console.log({ cfg })
      setConfig(cfg)
    } else {
      // only put data in.
      // const series = config?.series
      // if (options && options.series && series?.length) {
      //   for (const item in (options?.series[0] as any).data) {
      //     ;(series[0] as any).addPoint(item)
      //   }
      // }
      // console.log(options)
    }
  }, [colors, config, options, theme.palette.primary.main, type])

  // const options: ApexOptions = {
  //   chart: {
  //     parentHeightOffset: 0,
  //     toolbar: { show: false }
  //   },
  //   plotOptions: {
  //     bar: {
  //       borderRadius: 9,
  //       distributed: true,
  //       columnWidth: '40%',
  //       endingShape: 'rounded',
  //       startingShape: 'rounded'
  //     }
  //   },
  //   stroke: {
  //     width: 2,
  //     colors: [theme.palette.background.paper]
  //   },
  //   legend: { show: false },
  //   grid: {
  //     strokeDashArray: 7,
  //     padding: {
  //       top: -1,
  //       right: 0,
  //       left: -12,
  //       bottom: 5
  //     }
  //   },
  //   dataLabels: { enabled: false },
  //   colors: [
  //     theme.palette.background.default,
  //     theme.palette.background.default,
  //     theme.palette.background.default,
  //     theme.palette.primary.main,
  //     theme.palette.background.default,
  //     theme.palette.background.default
  //   ],
  //   states: {
  //     hover: {
  //       filter: { type: 'none' }
  //     },
  //     active: {
  //       filter: { type: 'none' }
  //     }
  //   },
  //   xaxis: {
  //     categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  //     tickPlacement: 'on',
  //     labels: { show: false },
  //     axisTicks: { show: false },
  //     axisBorder: { show: false }
  //   },
  //   yaxis: {
  //     show: true,
  //     tickAmount: 4,
  //     labels: {
  //       offsetX: -17,
  //       formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
  //     }
  //   }
  // }

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        // eslint-disable-next-line lines-around-comment
        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
        //     <DotsVertical />
        //   </IconButton>
        // }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        {config ? <HighchartsReact highcharts={Highcharts} options={config} /> : <div style={{ height: 115 }} />}
        {/* <ReactApexcharts type='bar' height={245} options={options} series={[{ data: [37, 57, 45, 75, 57, 40, 65] }]} />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            45%
          </Typography>
          <Typography variant='body2'>Your sales performance is 45% 😎 better compared to last month</Typography>
        </Box> */}
      </CardContent>
    </Card>
  )
}

export default StatisticsCharts

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useMemo, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { useTheme } from '@mui/material/styles'

// import { Box } from 'mdi-material-ui'
// import { Typography } from '@mui/material'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

// ** Icons Imports

// ** Third Party Imports

// ** Custom Components Imports

function mapJsonToSeries(json: any) {
  const val = Object.keys(json[0]).map(item => ({ name: item, data: json.map((i: any) => i[item]) }))

  return val
}

const WeeklyOverview = ({ title }: { title: string; type?: string }) => {
  const [config, setConfig] = useState<Highcharts.Options>()
  const [initialized, setInitialized] = useState(false)

  const theme = useTheme()

  useMemo(() => {
    ;(async () => {
      if (initialized) return
      if (global.window) {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER + '/api/vesting/')
        const json = (await res.json()).results

        const series = mapJsonToSeries(json) as any
        const options: Highcharts.Options = {
          chart: {
            type: 'area',
            height: 315,
            backgroundColor: 'transparent'
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              fillOpacity: 0.4,
              lineWidth: 0
            }
          },
          legend: { enabled: false },
          exporting: { enabled: false },
          title: {
            text: undefined
          },
          xAxis: {
            allowDecimals: false,
            tickInterval: 1200,
            categories: series[0].data
          },
          colors: [
            theme.palette.primary.light,
            theme.palette.primary.dark,
            theme.palette.success.light,
            theme.palette.success.dark,
            theme.palette.info.light,
            theme.palette.info.dark,
            theme.palette.warning.light,
            theme.palette.warning.dark
          ],
          yAxis: {
            allowDecimals: false,
            gridLineColor: theme.palette.divider,
            gridLineDashStyle: 'DashDot',
            max: 1e9,
            title: {
              text: undefined
            }
          },
          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<b>{point.key}</b><br><br>'
          },
          credits: {
            enabled: false
          },
          series
        }

        setConfig(options)
        setInitialized(true)
      }
    })()
  }, [initialized, theme.palette])

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={config} />
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview

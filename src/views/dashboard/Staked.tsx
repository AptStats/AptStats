import { CardHeader, CardContent, Card, useTheme } from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { useMemo, useState } from 'react'
import { useGetCoinSupplyLimit } from '../../clientApi/hooks/useGetCoinSupplyLimit'
import { useGetValidatorSet } from '../../clientApi/hooks/useGetValidatorSet'
import Tokenomics from './Tokenomics'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

const Staked = ({ title }: { title: string }) => {
  const [config, setConfig] = useState<Highcharts.Options>()

  const total_supply = useGetCoinSupplyLimit()
  const { totalVotingPower } = useGetValidatorSet()

  // ** Hook
  const theme = useTheme()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const colors = useMemo(
    () => [
      theme.palette.secondary.main,
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.background.default,
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
    const options: Highcharts.Options = {
      chart: {
        type: 'pie',
        height: 160,
        backgroundColor: 'transparent',
        plotBorderWidth: undefined
      },
      title: { text: undefined },
      legend: { enabled: false },
      exporting: { enabled: false },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
            distance: -50,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 4
            }
          },

          // startAngle: -90,
          // endAngle: 90,
          // center: ['50%', '75%'],
          size: '130%'
        }
      },
      colors,
      xAxis: {
        tickInterval: 1

        // categories: series[0].data,
        // labels: {
        //   enabled: true,
        //   formatter: function () {
        //     return series[0].data[this.pos]
        //   }
        // }
      },
      yAxis: {
        gridLineWidth: 0

        // title: {
        //   text: 'Amount($APT)'
        // }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<b>{point.key}</b><br><br>'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: '$APT',
          colorByPoint: true,

          // innerSize: '50%',
          data: [
            {
              name: 'Staked',
              y: totalVotingPower ? Math.round(+totalVotingPower / Math.pow(10, 8)) : undefined
            },
            {
              name: 'Circulating',
              y:
                total_supply && totalVotingPower ? Math.round((total_supply - +totalVotingPower) / Math.pow(10, 8)) : 0,
              selected: true
            }
          ]
        }

        //
      ] as any
    }

    setConfig(options)
  }, [colors, total_supply, totalVotingPower])

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', fontSize: 14, letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <Tokenomics />
        <HighchartsReact highcharts={Highcharts} options={config} />
      </CardContent>
    </Card>
  )
}

export default Staked

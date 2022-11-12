// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { Stats } from '../types'
import StatisticsCard from '../views/dashboard/StatisticsCard'
import Staked from '../views/dashboard/Staked'
import MarketInfo from '../views/dashboard/MarketInfo'
import CounterDown from '../views/dashboard/CounterDown'
import ValidatorTable from '../views/dashboard/ValidatorTable'
import StatisticsCharts from '../views/dashboard/StatisticsCharts'
import DateCounter from '../views/dashboard/DateCounter'
import VestingChart from '../views/dashboard/VestingCharts'
import CardStatsVertical from '../@core/components/card-statistics/card-stats-vertical'
import Icon from 'src/@core/components/icon'

const Home = () => {
  const [stats, setStats] = useState<Stats>()

  useInterval(async () => {
    if (global.window) {
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER + '/api/stats/')
      setStats((await res.json()).results)
    }
  }, 1000 * 2)

  return (
    <>
      {/* <ApexChartWrapper> */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <DateCounter />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard stats={stats} />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <VestingChart title='Vesting Schedule' />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <MarketInfo />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Staked title='Metrics & Staking' />
            </Grid>
            <Grid item xs={12} md={6}>
              <CounterDown title='Next unlock' />
              <CardStatsVertical
                stats={stats ? stats?.avgTPS + '/' + stats?.max_tps_15_blocks : '...'}
                title='TPS / Peak TPS'
                trend='negative'
                color='primary'
                trendNumber=''
                subtitle='Real time / Peak in 30 days'
                icon={<Icon icon='mdi:briefcase-variant-outline' />}
              />
            </Grid>
          </Grid>
        </Grid>

        {[
          {
            title: 'Transactions',
            options: stats?.chartTransactions,
            type: 'column'
          },
          {
            title: 'Addresses',
            options: stats?.chartStatAddresses
          },
          {
            title: 'Supply',
            options: stats?.chartStatSupply
          },
          {
            title: 'Fees',
            options: stats?.chartStatFee,
            type: 'area'
          },
          {
            title: 'Gas',
            options: stats?.chartStatGas
          },
          {
            title: 'TPS',
            options: stats?.chartStatTps
          }
        ].map(({ title, options, type }) => (
          <Grid item xs={12} md={6} lg={2} key={title}>
            <StatisticsCharts title={title} options={options} type={type} />
          </Grid>
        ))}

        <Grid item xs={12} md={12} lg={12}>
          <ValidatorTable />
        </Grid>
      </Grid>
      {/* </ApexChartWrapper> */}
    </>
  )
}

export default Home

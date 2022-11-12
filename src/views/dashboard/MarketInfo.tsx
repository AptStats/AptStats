// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { useInterval } from 'usehooks-ts'
import { useMemo, useState } from 'react'
import moment from 'moment'
import { format } from '../../clientApi/utils'
import Icon from 'src/@core/components/icon'

interface DataType {
  title: string
  imgSrc: string
  amount: string
  subtitle: string
  progress: number
  color: ThemeColor
  imgHeight: number
  trends?: number
}
export interface MarketInfo {
  price: number
  volume_24h: number
  volume_24h_change_24h: number
  market_cap: number
  market_cap_change_24h: number
  percent_change_15m: number
  percent_change_30m: number
  percent_change_1h: number
  percent_change_6h: number
  percent_change_12h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_1y: number
  ath_price: number
  ath_date: Date
  percent_from_price_ath: number
}

export interface Quotes {
  USD: MarketInfo
}

export interface CoinInfo {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: Date
  last_updated: Date
  quotes: Quotes
}

const MarketInfo = () => {
  const [coinInfo, setCoinInfo] = useState<CoinInfo>()

  useInterval(async () => {
    const res = await (await fetch('https://api.coinpaprika.com/v1/tickers/apt-aptos')).json()
    setCoinInfo(res)
  }, 2000)

  const data = useMemo(() => {
    return [
      {
        title: 'Trading Volumes',
        progress: 100,
        color: 'info' as ThemeColor,
        amount: coinInfo ? format(coinInfo?.quotes.USD.volume_24h, true) : '...',
        subtitle: 'On all platforms',
        imgSrc: '/images/cards/logo-aviato.png',
        imgHeight: 27,
        trends: coinInfo ? coinInfo?.quotes.USD.volume_24h_change_24h : 0
      },
      {
        title: 'Supply',
        progress: coinInfo ? Math.round((coinInfo?.circulating_supply / coinInfo?.total_supply) * 100) : 0,
        color: 'primary' as ThemeColor,
        amount: coinInfo ? format(coinInfo?.circulating_supply) : '...',
        subtitle: 'Circulating Supply',
        imgSrc: '/images/cards/logo-zipcar.png',
        imgHeight: 20
      },
      {
        title: 'MarketCap',
        progress: 100,
        color: 'secondary' as ThemeColor,
        amount: coinInfo ? format(coinInfo?.quotes.USD.market_cap, true) : '...',
        subtitle: 'Currently Ranked #' + (coinInfo ? coinInfo?.rank : '...'),
        imgSrc: '/images/cards/logo-bitbank.png',
        imgHeight: 27,
        trends: coinInfo ? coinInfo?.quotes.USD.market_cap_change_24h : 0
      }
    ]
  }, [coinInfo])

  return (
    <Card>
      <CardHeader
        title='Aptos Market Info'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            ${coinInfo ? coinInfo?.quotes.USD.price.toFixed(4) : '...'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: coinInfo
                ? coinInfo?.quotes.USD.percent_change_24h > 0
                  ? 'success.main'
                  : 'error.main'
                : 'info.main'
            }}
          >
            <Icon
              icon={coinInfo && coinInfo?.quotes.USD.percent_change_24h > 0 ? 'mdi:menu-up' : 'mdi:menu-down'}
              style={{ fontSize: '1.875rem', verticalAlign: 'middle' }}
            />
            <Typography
              variant='body2'
              sx={{
                fontWeight: 600,
                color: coinInfo
                  ? coinInfo?.quotes.USD.percent_change_24h > 0
                    ? 'success.main'
                    : 'error.main'
                  : 'info.main'
              }}
            >
              {coinInfo?.quotes.USD.percent_change_24h} %
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 10 }}>
          ATH: ${coinInfo ? coinInfo.quotes.USD.ath_price.toFixed(4) : '...'} at{' '}
          {coinInfo ? moment(coinInfo.quotes.USD.ath_date).format('yyyy-MM-DD HH:mm') : '...'}
        </Typography>

        {data.map((item: DataType, index: number) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                }}
              >
                <img src={item.imgSrc} alt={item.title} height={item.imgHeight} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>

                {item.trends && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: coinInfo ? (item.trends > 0 ? 'success.main' : 'error.main') : 'info.main'
                    }}
                  >
                    <Icon
                      icon={coinInfo && item.trends ? 'mdi:menu-up' : 'mdi:menu-down'}
                      style={{ fontSize: '1.875rem', verticalAlign: 'middle' }}
                    />

                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 600,
                        color: coinInfo ? (item.trends > 0 ? 'success.main' : 'error.main') : 'info.main'
                      }}
                    >
                      {item.trends} %
                    </Typography>
                  </Box>
                )}

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default MarketInfo

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { format } from '../../clientApi/utils'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'
import Icon from 'src/@core/components/icon'

// import AccessTimeFilledIcon from 'mdi-material-ui/ClockAlert'
// import Information from 'mdi-material-ui/Information'

export interface ScheduleInfo {
  label: string
  beginDate: string
  endDate: string
  beginAmount: string
  endAmount: string
}

const CounterDown = ({ title }: { title: string }) => {
  const [info, setInfo] = useState<ScheduleInfo[]>()
  const [time, setTime] = useState('')

  const theme = useTheme()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { lg, md, sm } = {
    lg: useMediaQuery((theme: Theme) => theme.breakpoints.down('lg')),
    md: useMediaQuery((theme: Theme) => theme.breakpoints.down('md')),
    sm: useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  }

  useEffect(() => {
    if (!global.window) return
    ;(async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER + '/api/schedule/')
      const json = (await res.json()).results
      if (json.length > 0) {
        setInfo(json)
        setTime(json[0].beginDate)
      }
    })()
  }, [])

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', marginBottom: 3.5, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'error.main' }}>
            <Icon fontSize='inherit' icon='mdi:clock-alert' />
          </Avatar>
          <Typography variant={lg ? 'h5' : 'h6'} sx={{ mr: 3, mt: 1, fontWeight: 400 }}>
            {time ? <Countdown date={time} /> : 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 1.5, display: 'flex', flexWrap: 'wrap', marginBottom: 1, alignItems: 'flex-start' }}>
          <Box sx={{ fontWeight: 400, fontSize: '0.875rem' }}>
            Amt: {'  '}
            {info
              ? format(info?.reduce((prev, current) => +prev + (+current.endAmount - +current.beginAmount), 0))
              : '...'}{' '}
            $APT
            <Tooltip
              title={info?.map(inf => inf.label + ': ' + format(+inf.endAmount - +inf.beginAmount)).join(', ') + ' '}
            >
              <IconButton disableRipple>
                <Icon
                  style={{ marginLeft: 1, fontSize: 14 }}
                  color={theme.palette.primary.main}
                  icon='mdi:information'
                />
              </IconButton>
            </Tooltip>
            <br />
            Date: {moment(time).format('yyyy-MM-DD HH:mm')}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CounterDown

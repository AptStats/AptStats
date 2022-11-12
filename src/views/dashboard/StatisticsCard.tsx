// ** React Imports
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Stats } from '../../types'
import Icon from 'src/@core/components/icon'

const StatisticsCard = ({ stats }: { stats?: Stats }) => {
  const renderStats = () => {
    return [
      {
        title: 'Epoch',
        stats: stats?.epoch,
        color: 'success',
        icon: <Icon icon='mdi:triangle' style={{ fontSize: '1.75rem' }} color='primary' />
      },
      {
        title: 'Latest Block',
        stats: stats?.block_height,
        color: 'primary',
        icon: <Icon icon='mdi:trending-up' style={{ fontSize: '1.75rem' }} />
      },
      {
        title: 'Latest Leger Version',
        stats: stats?.latestVersion,
        color: 'info',
        icon: <Icon icon='mdi:cellphone-link' style={{ fontSize: '1.75rem' }} />
      },
      {
        title: 'Total Addresses',
        stats: stats?.uniqueAddresses,
        color: 'warning',
        icon: <Icon icon='mdi:account-outline' style={{ fontSize: '1.75rem' }} />
      }
    ].map((item, index: number) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats || '...'}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistics'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Overall statistics
            </Box>{' '}
            of Aptos mainnet.
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard

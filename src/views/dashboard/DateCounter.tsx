// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import ReactTimeAgo from 'react-time-ago'
import moment from 'moment'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the DateCounter image
const DateCounterImg = styled('svg')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const DateCounter = () => {
  // ** Hook
  const theme = useTheme()

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Aptos Mainnet has launched</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          since {moment(1665609760857).format('yyyy-MM-DD HH:mm:ss')}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          <ReactTimeAgo date={new Date(1665609760857)} timeStyle='round-minute' locale='en-US' />
        </Typography>
        <Button size='small' variant='contained' onClick={() => window.open('https://explorer.aptoslabs.com/block/1')}>
          View genesis block
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <DateCounterImg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M512 972.8c254.498133 0 460.8-206.301867 460.8-460.8S766.498133 51.2 512 51.2 51.2 257.501867 51.2 512s206.301867 460.8 460.8 460.8z m0-68.266667C295.202133 904.533333 119.466667 728.797867 119.466667 512S295.202133 119.466667 512 119.466667s392.533333 175.735467 392.533333 392.533333-175.735467 392.533333-392.533333 392.533333z'
            fill='#1296db'
          ></path>
          <path
            d='M374.016 597.333333a34.133333 34.133333 0 1 0 49.271467 47.274667l104.516266-108.987733A34.133333 34.133333 0 0 0 537.2928 512V266.410667a34.133333 34.133333 0 1 0-68.266667 0v231.867733l-95.010133 99.072z'
            fill='#1296db'
          ></path>
        </DateCounterImg>
      </CardContent>
    </Card>
  )
}

export default DateCounter

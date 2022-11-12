// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icons Imports
// import ChevronUp from 'mdi-material-ui/ChevronUp'
// import ChevronDown from 'mdi-material-ui/ChevronDown'

import { Item } from 'rss-parser'
import ReactTimeAgo from 'react-time-ago'
import Link from 'next/link'
import { styled } from '@mui/material/styles'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '1rem',
  textDecoration: 'none',
  lineHeight: 0.5,
  marginLeft: 1,
  '&:hover': {
    textDecoration: 'underline'
  },
  color: theme.palette.text.primary
}))

const CardWithCollapse = ({ data }: { data: Item & { cover?: string } }) => {
  if (typeof global.window !== undefined) {
    const domParser = new DOMParser()
    if (data.content) {
      const parsed = domParser.parseFromString(data.content, 'text/html')
      const image = parsed.querySelector('img')
      if (image) {
        data.cover = image.src
      }
    }
  }

  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image={data.cover || '/images/cards/paper-boat.png'} />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          <Link
            passHref
            href={data.link!}
            target={'_blank'}
            style={{
              textDecoration: 'none'
            }}
          >
            <LinkStyled>{data.title?.replace(/^(.{80}[^\s]*).*/, '$1')}</LinkStyled>
          </Link>
        </Typography>
        <Typography
          variant='body2'
          sx={{
            height: 84,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            lineClamp: 2,
            display: 'box'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: data.contentSnippet || data.summary || '' }}></div>
        </Typography>
      </CardContent>
      <CardActions className='card-action-dense'>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mb: 4.75, ml: 2, display: 'flex', flexWrap: 'wrap', alignSelf: 'flex-end' }}>
            <Typography variant='body2'>
              {data.creator?.split('-')[0].trim().split('|')[0]} |{' '}
              <ReactTimeAgo date={new Date(data.isoDate!)} timeStyle='round-minute' locale='en-US' />
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  )
}

export default CardWithCollapse

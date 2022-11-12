// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
// import CardImgTop from 'src/views/cards/CardImgTop'
// import CardUser from 'src/views/cards/CardUser'

// import CardSupport from 'src/views/cards/CardSupport'
import CardTwitter from 'src/views/cards/CardTwitter'

// import CardFacebook from 'src/views/cards/CardFacebook'
// import CardLinkedIn from 'src/views/cards/CardLinkedIn'
// import CardAppleWatch from 'src/views/cards/CardAppleWatch'

// import CardMembership from 'src/views/cards/articleFeedItemWithCover'

// import CardInfluencer from 'src/views/cards/CardInfluencer'
// import CardNavigation from 'src/views/cards/CardNavigation'
import CardWithCollapse from 'src/views/cards/CardWithCollapse'

// import CardVerticalRatings from 'src/views/cards/CardVerticalRatings'
// import CardNavigationCenter from 'src/views/cards/CardNavigationCenter'
// import CardHorizontalRatings from 'src/views/cards/CardHorizontalRatings'

// import { useState } from 'react'
// import { useInterval } from 'usehooks-ts'
import RssParser, { Item } from 'rss-parser'

const parser = new RssParser()

export async function getServerSideProps(context: any) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  const articleFeed = await parser.parseURL(`https://rss.app/feeds/_YYknb8o5oF1qCq88.xml`)

  // const tweetsFeed = await parser.parseURL('https://rss.app/feeds/mDDGtgCLn6RuvQHR.xml')

  return {
    props: {
      data: {
        articles: articleFeed.items

        // tweets: tweetsFeed.items
      }
    }
  }
}

const CardBasic = ({ data }: { data: { articles: (any & Item)[]; tweets: (any & Item)[] } }) => {
  // const [news, setNews] = useState()

  console.log({ data })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Latest Aptos News</Typography>
      </Grid>

      {data.tweets &&
        data.tweets.map((item, i) => (
          <>
            <Grid item xs={12} sm={6} md={4} key={i}>
              <CardTwitter data={item} />
            </Grid>
          </>
        ))}
      {data.articles.map((item, i) => (
        <>
          <Grid item lg={3} xs={12} sm={6} md={4} key={i}>
            <CardWithCollapse data={item} />
          </Grid>
        </>
      ))}
    </Grid>
  )
}

export default CardBasic

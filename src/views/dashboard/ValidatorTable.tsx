// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Link from '@mui/material/Link'

// ** Types Imports
import { useGetValidatorSet } from '../../clientApi/hooks/useGetValidatorSet'
import { hexToUint8Array, numberWithCommas, vectorToString } from '../../clientApi/utils'
import { Grid, Paper } from '@mui/material'
import { useMemo, useState } from 'react'
import MapView from './Map'

export interface Location {
  location: {
    latitude: number
    longitude: number
    time_zone: string
    accuracy_radius: number
  }
  continent: string
  country: string
  city?: string
}

export type LocationResponse = Location | false

const DashboardTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { totalVotingPower, numberOfActiveValidators, activeValidators, validatorPerformances } = useGetValidatorSet()
  const [cities, setCities] = useState<LocationResponse[]>([])
  const [initialized, setInitialized] = useState(false)
  const [geoJson, setGeoJson] = useState<any>()

  const validators = activeValidators.map((v, i) => {
    const str = vectorToString(v.config.network_addresses).split(' ')[0]
    const str2 = hexToUint8Array(v.config.fullnode_addresses)

    const match = str.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g)

    return {
      index: v.config.validator_index,
      full_address: v.addr,
      address: v.addr.substr(0, 10) + '...' + v.addr.substr(-10),
      network_address: match ? match[0] : 'N/A',
      fullnode_address: str2,
      voting_power: numberWithCommas(+v.voting_power / Math.pow(10, 8), 2),
      vp_percentange: totalVotingPower ? (+v.voting_power / +totalVotingPower) * 100 : 0,
      successful_proposals: validatorPerformances ? validatorPerformances[i].successful_proposals : 0,
      failed_proposals: validatorPerformances ? validatorPerformances[i].failed_proposals : 0
    }
  })

  useMemo(() => {
    if (initialized || validators.length === 0) return
    ;(async () => {
      const addresses = validators.map(v => (v.network_address === 'N/A' ? '' : v.network_address))

      const res = await fetch(process.env.NEXT_PUBLIC_SERVER + '/api/loc/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hosts: addresses })
      })
      const json = (await res.json()).results
      setCities(json)
      setInitialized(true)
    })()
  }, [initialized, validators])

  useMemo(() => {
    if (!cities || !cities.length) return

    setGeoJson({
      type: 'Feature',
      features: (cities.filter(loc => !!loc) as Location[]).map((loc: Location) => ({
        properties: {
          city: loc.city || '...',
          country: loc.country || '...',
          iconSize: [15, 21]
        },
        geometry: {
          type: 'Point',
          coordinates: {
            lat: loc.location.latitude,
            lng: loc.location.longitude
          }
        }
      }))
    })
  }, [cities])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12} lg={4}>
        <MapView geoJson={geoJson} />
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        <Card>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Network Address</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Voting Power</TableCell>
                    <TableCell>Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {validators
                    .sort((a, b) => b.vp_percentange - a.vp_percentange)
                    .map((row, index) => (
                      <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                        <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                              {row.index}
                            </Typography>
                            {/* <Typography variant='caption'>{row.addr}</Typography> */}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Link target='_blank' href={`https://explorer.aptoslabs.com/account/${row.full_address}`}>
                            {row.address}
                          </Link>
                        </TableCell>
                        <TableCell>{row.network_address}</TableCell>
                        <TableCell>
                          {cities && cities[index]
                            ? (cities[index] as Location).city || (cities[index] as Location).country
                            : '...'}
                        </TableCell>
                        <TableCell>
                          {row.voting_power} ({row.vp_percentange.toFixed(2)}%)
                        </TableCell>
                        <TableCell>
                          <Typography title='Successful proposals' sx={{ display: 'inline' }} color='success.main'>
                            {row.successful_proposals}
                          </Typography>{' '}
                          /{' '}
                          <Typography title='Failed proposals' color='error.main' sx={{ display: 'inline' }}>
                            {row.failed_proposals}
                          </Typography>
                        </TableCell>
                        {/* <TableCell>
                  <Chip
                    label={row.status}
                    // color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardTable

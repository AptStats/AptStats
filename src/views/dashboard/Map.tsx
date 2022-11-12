import { Card, CardContent, CardContentProps, CircularProgress, styled, useTheme } from '@mui/material'

// import MapMarker from 'mdi-material-ui/MapMarker'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>
  onMapLoaded?(map: mapboxgl.Map): void
  onMapRemoved?(): void
  geoJson?: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CardContentNoPadding = styled(CardContent)<CardContentProps>(({ theme }) => ({
  padding: 0,
  '&:last-child': {
    paddingBottom: 0
  }
}))

const MapView: NextPage<any, MapboxMapProps> = ({
  initialOptions = {},
  onMapLoaded,
  onMapRemoved,
  geoJson
}: MapboxMapProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<mapboxgl.Map>()
  const [loading, setLoading] = useState(true)

  const mapNode = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    const node = mapNode.current

    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === 'undefined' || node === null) return

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '',
      style: theme.palette.mode === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10',
      center: [-74.5, 40],
      zoom: 0,
      ...initialOptions
    })

    // save the map object to useState
    setMap(mapboxMap)
    setLoading(false)
    if (onMapLoaded) mapboxMap.once('load', onMapLoaded)

    return () => {
      mapboxMap.remove()
      if (onMapRemoved) onMapRemoved()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.palette.mode])

  useEffect(() => {
    if (!map || !geoJson) return
    geoJson.features.forEach((marker: any) => {
      // create a DOM element for the marker
      const markerIcon = document.createElement('div')
      markerIcon.className = 'location-marker'
      markerIcon.style.backgroundImage = 'url(/images/location-marker.png)'
      markerIcon.style.backgroundSize = 'cover'
      markerIcon.style.width = marker.properties.iconSize[0] + 'px'
      markerIcon.style.height = marker.properties.iconSize[1] + 'px'

      new mapboxgl.Marker(markerIcon)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<p style="color: ${theme.palette.primary.main}">${marker.properties.city}, ${marker.properties.country}</p>`
          ) // add pop out to map
        )
        .addTo(map)
    })
  }, [geoJson, map, theme])

  return (
    <Card sx={{ padding: 0, margin: 0 }}>
      <CardContentNoPadding sx={{ padding: 0!, margin: 0, position: 'relative' }}>
        {loading && <MapLoadingHolder />}
        <div
          className='map-container'
          style={{ width: '100%', height: '438px', ...(loading ? { position: 'absolute', top: 0, right: 0 } : {}) }}
          ref={mapNode}
        />
      </CardContentNoPadding>
    </Card>
  )
}
export default MapView

export function MapLoadingHolder() {
  const theme = useTheme()

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'bottom',
        height: '440px',
        zIndex: 100,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <CircularProgress style={{ alignSelf: 'center' }} />
    </div>
  )
}

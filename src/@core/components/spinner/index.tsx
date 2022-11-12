// ** MUI Import
import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.palette.grey[400],
        ...sx
      }}
    >
      <style>{`
        html,
        body {
          background-color: ${theme.palette.grey[400]};
          margin: 0;
        }
      `}</style>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <svg height='32' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 258.21 60.7'>
          <path d='M197.83 20.31h-5.35a2.17 2.17 0 0 1-1.63-.74l-2.17-2.45a1.71 1.71 0 0 0-2.55 0l-1.86 2.1a3.2 3.2 0 0 1-2.4 1.09h-29.28A30.34 30.34 0 0 0 151 27.8h27.64a1.77 1.77 0 0 0 1.28-.55l2.58-2.69a1.71 1.71 0 0 1 1.23-.52h.1a1.74 1.74 0 0 1 1.28.57l2.17 2.45a2.16 2.16 0 0 0 1.63.74h22.55a29.9 29.9 0 0 0-1.59-7.49h-12Zm-30.11 23.24A1.79 1.79 0 0 0 169 43l2.57-2.69a1.74 1.74 0 0 1 1.23-.52h.11a1.74 1.74 0 0 1 1.28.57l2.16 2.45a2.19 2.19 0 0 0 1.63.74h30.57a30 30 0 0 0 2.5-7.55H181.7a2.18 2.18 0 0 1-1.62-.73l-2.17-2.45a1.71 1.71 0 0 0-1.28-.58 1.67 1.67 0 0 0-1.27.58l-1.86 2.1a3.22 3.22 0 0 1-2.41 1.08h-19.68a30 30 0 0 0 2.49 7.57Zm21.69-31.43a1.79 1.79 0 0 0 1.29-.55l2.57-2.68a1.7 1.7 0 0 1 1.23-.53h.11a1.67 1.67 0 0 1 1.27.58l2.17 2.45a2.21 2.21 0 0 0 1.63.73h5.81a30.34 30.34 0 0 0-48.52 0Zm-11.68 38.93h-7.95a2.15 2.15 0 0 1-1.62-.74L166 47.86a1.72 1.72 0 0 0-2.56 0L161.57 50a3.19 3.19 0 0 1-2.4 1.09h-.12a30.33 30.33 0 0 0 44.37 0ZM47.07 58.74l-6.17-15H13.31l-6.17 15H0L27.06 2l27.15 56.74ZM15.64 38.05h22.85L27 13.86Zm48.43 20.69V2h15.8c12.35 0 18.84 5.65 18.84 16.32 0 10.26-6.89 16.2-18.92 16.2h-9.06v24.22Zm6.66-30.16h7.54c9.54 0 13.73-3.12 13.73-10.26 0-7.38-4.25-10.43-13.71-10.43h-7.56Zm52.16-20.53h-19.57V1.96h45.79v6.09h-19.57v50.69h-6.65V8.05zm97.95 40.34 5.73-3.89.44.92c3.53 6.42 7.38 9 13.23 9 6.5 0 11.07-4.49 11.07-9.95 0-5.13-2.57-8.58-12.83-12.83-11.79-4.89-15.8-9.94-15.8-17.16 0-7.86 6.18-14 16.84-14 7.86 0 13.23 3.36 16.28 8.82l-4.65 3.21-1.36-.33c-2.41-3.76-5.38-5.93-10.43-5.93-6.17 0-9.78 3.45-9.78 8.1 0 4.33 2.32 6.82 12.35 11.39 13.07 5.93 16.28 10.82 16.28 18.68 0 8.58-7.38 15.88-17.89 15.88-8.82 0-14.91-3.37-19.48-11.87'></path>
        </svg>{' '}
        <Typography
          variant='h6'
          sx={{
            alignSelf: 'flex-end',
            verticalAlign: 'bottom',
            mx: 1
          }}
        >
          Stats
        </Typography>
      </Box>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner

// ** MUI Imports
import { Collapse, Alert, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Icon from 'src/@core/components/icon'

import { useState, useCallback } from 'react'

const FooterContent = () => {
  const [message, setMessage] = useState('')

  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const showMessage = useCallback((msg: string) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }, [])

  return (
    <>
      <Collapse in={!!message} style={{ position: 'fixed', bottom: 40, right: 20 }}>
        <Alert
          color='warning'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setMessage('')
              }}
            >
              <Icon fontSize='inherit' icon='mdi:close' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ mr: 2 }}>
          {`© ${new Date().getFullYear()} AptStats.xyz. `}
          {/* <Box component='span' sx={{ color: 'error.main' }}>
            ❤️
          </Box>
          {` by `}
          <Link target='_blank' href='https://twitter.com/0xdyi'>
            Eric
          </Link>
          .*/}
        </Typography>
        {hidden ? null : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
            <Link
              href='#'
              onClick={e => {
                e.preventDefault()
                navigator.clipboard.writeText(
                  'Buy me a coffee. ❤️ wallet address: 0xd64809bd20c765ccd227abc0647589cd6bdfb9e40726ea3e5a8eaafbd995efcc'
                )
                showMessage('Check your clipboard to buy me a coffee. :-)')
              }}
            >
              Donate
            </Link>
            <Link
              href='#'
              onClick={e => {
                e.preventDefault()
                navigator.clipboard.writeText(
                  'Send me an email for any suggestions / corporations. ❤️ email address: eric.allen.1112@gmail.com'
                )
                showMessage('Check your clipboard to get in touch. ;-)')
              }}
            >
              Contact
            </Link>
          </Box>
        )}
      </Box>
    </>
  )
}

export default FooterContent

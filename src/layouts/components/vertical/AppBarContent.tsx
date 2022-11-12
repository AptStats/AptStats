/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import { Link, Theme, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

interface LinkProps {
  icon: string
  href?: string
  clickHandler?: () => void
  newWindow?: boolean
  tips?: string
}

type LinkItem = LinkProps | JSX.Element

function instanceOfLinkProps(object: any): object is LinkProps {
  return 'icon' in object
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const { navCollapsed } = settings

  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const items: LinkItem[] = [
    { icon: 'mdi:email', href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`, tips: 'Click to get in touch.' },
    { icon: 'mdi:telegram', href: process.env.NEXT_PUBLIC_TELEGRAM!, newWindow: true, tips: 'Joi our community.' },
    {
      icon: 'mdi:twitter',
      href: process.env.NEXT_PUBLIC_TWITTER!,
      newWindow: true,
      tips: 'Follow our twitter to get the lasted updates.'
    },
    <ModeToggler settings={settings} saveSettings={saveSettings} key='toggler' />,
    isSM ? (
      <></>
    ) : (
      {
        icon: navCollapsed ? 'mdi:arrow-collapse-right' : 'mdi:arrow-collapse-left',
        clickHandler: () => saveSettings({ ...settings, navCollapsed: !navCollapsed }),
        tips: navCollapsed ? 'Expand the navigation.' : 'Collapse the navigation.'
      }
    )
  ]

  function renderItem(item: LinkItem, i: number) {
    return instanceOfLinkProps(item) ? (
      <Link href={item.href} key={i}>
        <Tooltip title={item.tips}>
          <IconButton
            color='default'
            aria-haspopup='true'
            onClick={e => {
              e.preventDefault()
              item.href
                ? item.newWindow
                  ? window.open(item.href)
                  : (location.href = item.href!)
                : item.clickHandler
                ? item.clickHandler()
                : undefined
            }}
          >
            <Icon icon={item.icon} />
          </IconButton>
        </Tooltip>
      </Link>
    ) : (
      (item as JSX.Element)
    )
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {items.map((item, i) => renderItem(item, i))}
      </Box>
    </Box>
  )
}

export default AppBarContent

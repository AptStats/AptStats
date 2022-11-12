/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Next Import

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// ** Configs

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight,
  marginBottom: 12
}))

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  // const theme = useTheme()
  const { navCollapsed } = settings

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 30) / 8
      }
    } else {
      return 6
    }
  }

  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon='mdi:radiobox-marked' />

  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon='mdi:radiobox-blank' />

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <div style={{ marginTop: '12px', display: 'flex' }}>
          {!(navCollapsed && !navHover) ? (
            <>
              <svg height='32' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 258.21 60.7'>
                <path d='M197.83 20.31h-5.35a2.17 2.17 0 0 1-1.63-.74l-2.17-2.45a1.71 1.71 0 0 0-2.55 0l-1.86 2.1a3.2 3.2 0 0 1-2.4 1.09h-29.28A30.34 30.34 0 0 0 151 27.8h27.64a1.77 1.77 0 0 0 1.28-.55l2.58-2.69a1.71 1.71 0 0 1 1.23-.52h.1a1.74 1.74 0 0 1 1.28.57l2.17 2.45a2.16 2.16 0 0 0 1.63.74h22.55a29.9 29.9 0 0 0-1.59-7.49h-12Zm-30.11 23.24A1.79 1.79 0 0 0 169 43l2.57-2.69a1.74 1.74 0 0 1 1.23-.52h.11a1.74 1.74 0 0 1 1.28.57l2.16 2.45a2.19 2.19 0 0 0 1.63.74h30.57a30 30 0 0 0 2.5-7.55H181.7a2.18 2.18 0 0 1-1.62-.73l-2.17-2.45a1.71 1.71 0 0 0-1.28-.58 1.67 1.67 0 0 0-1.27.58l-1.86 2.1a3.22 3.22 0 0 1-2.41 1.08h-19.68a30 30 0 0 0 2.49 7.57Zm21.69-31.43a1.79 1.79 0 0 0 1.29-.55l2.57-2.68a1.7 1.7 0 0 1 1.23-.53h.11a1.67 1.67 0 0 1 1.27.58l2.17 2.45a2.21 2.21 0 0 0 1.63.73h5.81a30.34 30.34 0 0 0-48.52 0Zm-11.68 38.93h-7.95a2.15 2.15 0 0 1-1.62-.74L166 47.86a1.72 1.72 0 0 0-2.56 0L161.57 50a3.19 3.19 0 0 1-2.4 1.09h-.12a30.33 30.33 0 0 0 44.37 0ZM47.07 58.74l-6.17-15H13.31l-6.17 15H0L27.06 2l27.15 56.74ZM15.64 38.05h22.85L27 13.86Zm48.43 20.69V2h15.8c12.35 0 18.84 5.65 18.84 16.32 0 10.26-6.89 16.2-18.92 16.2h-9.06v24.22Zm6.66-30.16h7.54c9.54 0 13.73-3.12 13.73-10.26 0-7.38-4.25-10.43-13.71-10.43h-7.56Zm52.16-20.53h-19.57V1.96h45.79v6.09h-19.57v50.69h-6.65V8.05zm97.95 40.34 5.73-3.89.44.92c3.53 6.42 7.38 9 13.23 9 6.5 0 11.07-4.49 11.07-9.95 0-5.13-2.57-8.58-12.83-12.83-11.79-4.89-15.8-9.94-15.8-17.16 0-7.86 6.18-14 16.84-14 7.86 0 13.23 3.36 16.28 8.82l-4.65 3.21-1.36-.33c-2.41-3.76-5.38-5.93-10.43-5.93-6.17 0-9.78 3.45-9.78 8.1 0 4.33 2.32 6.82 12.35 11.39 13.07 5.93 16.28 10.82 16.28 18.68 0 8.58-7.38 15.88-17.89 15.88-8.82 0-14.91-3.37-19.48-11.87'></path>
              </svg>{' '}
            </>
          ) : (
            <svg
              fill='currentColor'
              viewBox='219.659 -0.14 60.46 60.738'
              height='32'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g transform='matrix(1, 0, 0, 1, 91.727058, -42.804405)'>
                <path d='M 174.762 62.974 L 169.412 62.974 C 168.788 62.973 168.194 62.703 167.782 62.234 L 165.612 59.784 C 164.932 59.023 163.742 59.023 163.062 59.784 L 161.202 61.884 C 160.596 62.575 159.722 62.972 158.802 62.974 L 129.522 62.974 C 128.678 65.393 128.144 67.91 127.932 70.464 L 155.572 70.464 C 156.056 70.463 156.519 70.264 156.852 69.914 L 159.432 67.224 C 159.755 66.891 160.199 66.703 160.662 66.704 L 160.762 66.704 C 161.25 66.706 161.714 66.913 162.042 67.274 L 164.212 69.724 C 164.623 70.194 165.218 70.464 165.842 70.464 L 188.392 70.464 C 188.186 67.909 187.651 65.392 186.802 62.974 L 174.802 62.974 L 174.762 62.974 Z' />
                <path d='M 144.652 86.214 C 145.136 86.211 145.597 86.012 145.932 85.664 L 148.502 82.974 C 148.827 82.644 149.269 82.456 149.732 82.454 L 149.842 82.454 C 150.33 82.456 150.794 82.663 151.122 83.024 L 153.282 85.474 C 153.695 85.941 154.288 86.21 154.912 86.214 L 185.482 86.214 C 186.647 83.819 187.488 81.28 187.982 78.664 L 158.632 78.664 C 158.013 78.661 157.424 78.396 157.012 77.934 L 154.842 75.484 C 154.518 75.116 154.052 74.905 153.562 74.904 C 153.075 74.902 152.611 75.114 152.292 75.484 L 150.432 77.584 C 149.82 78.272 148.943 78.665 148.022 78.664 L 128.342 78.664 C 128.832 81.286 129.669 83.832 130.832 86.234 L 144.652 86.214 Z' />
                <path d='M 166.342 54.784 C 166.829 54.783 167.295 54.585 167.632 54.234 L 170.202 51.554 C 170.523 51.216 170.967 51.025 171.432 51.024 L 171.542 51.024 C 172.03 51.022 172.494 51.234 172.812 51.604 L 174.982 54.054 C 175.399 54.515 175.99 54.78 176.612 54.784 L 182.422 54.784 C 170.286 38.624 146.039 38.624 133.902 54.784 L 166.342 54.784 Z' />
                <path d='M 154.662 93.714 L 146.712 93.714 C 146.091 93.713 145.5 93.443 145.092 92.974 L 142.932 90.524 C 142.249 89.762 141.056 89.762 140.372 90.524 L 138.502 92.664 C 137.897 93.356 137.022 93.753 136.102 93.754 L 135.982 93.754 C 147.975 106.618 168.36 106.618 180.352 93.754 L 154.662 93.714 Z' />
              </g>
            </svg>
          )}
          {!(navCollapsed && !navHover) ? (
            <Typography
              sx={{
                alignSelf: 'flex-end',
                ...menuCollapsedStyles,
                ...(navCollapsed && !navHover ? {} : { ml: 3 })
              }}
            >
              Stats
            </Typography>
          ) : (
            <></>
          )}
        </div>
      )}

      {/* {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, backgroundColor: 'transparent !important' }}
        >
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            color: 'text.primary',
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )} */}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader

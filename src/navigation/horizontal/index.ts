// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    icon: 'mdi:home-outline',
    path: '/'
  },
  {
    title: 'Ecosystems',
    icon: 'mdi:account-cog-outline',
    path: '/ecosystems'
  },
  {
    title: 'News',
    icon: 'mdi:newspaper',
    path: '/news'
  },

  {
    title: 'Aptos Tools',
    icon: 'mdi:toolbox',
    path: 'https://aptools.xyz',
    externalLink: true,
    openInNewTab: true
  },

  {
    title: 'AptosLabs',
    icon: 'mdi:link',
    path: 'https://aptoslabs.com',
    externalLink: true,
    openInNewTab: true
  },
  {
    title: 'Aptos Foundation',
    path: 'https://aptosfoundation.org/',
    icon: 'mdi:link',
    externalLink: true,
    openInNewTab: true
  },
]

export default navigation

// ** React Imports
import { ReactNode } from 'react'

// ** Component Imports

// ** Types
import { NavSectionTitle } from 'src/@core/layouts/types'

interface Props {
  children: ReactNode
  navTitle?: NavSectionTitle
}

const CanViewNavSectionTitle = (props: Props) => {
  // ** Props
  const { children } = props

  return <>{children}</>
}

export default CanViewNavSectionTitle

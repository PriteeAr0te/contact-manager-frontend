import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main className='w-full h-full'>{children}</main>
    </div>
  )
}

export default Layout
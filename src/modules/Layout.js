import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main id="appBody">
        <Outlet />
    </main>
  )
}

export default Layout

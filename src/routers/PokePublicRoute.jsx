import React from 'react'
import { Navigate } from 'react-router'
import { useName } from '../hooks/useName'

function PokePublicRoute({ children }) {
  const { name } = useName()
  if (name) {
    return <Navigate to='/Pokedex' />
  }
  return children ? children : <Outlet />
}

export default PokePublicRoute

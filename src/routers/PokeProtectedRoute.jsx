import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useName } from '../hooks/useName'

function PokeProtectedRoute({ children }) {
    const { name } = useName()
   if ( !name ) {
       return <Navigate to='/' />
     }
   return children ? children : <Outlet />
   }
export default PokeProtectedRoute

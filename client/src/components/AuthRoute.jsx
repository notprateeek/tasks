import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function AuthRoute() {
  const { auth } = useAuth()
  if (auth === undefined) return 'loading...'

  return auth ? <Outlet /> : <Navigate to='/' />
}

export default AuthRoute

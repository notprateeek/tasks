import React from 'react'
import AuthForm from '../components/AuthForm'
import useAuth from '../hooks/useAuth'
import Navbar from '../components/Navbar'

function Auth({ setUserId }) {
  const { auth } = useAuth()
  return (
    <>
      <Navbar />
      {!auth && <AuthForm setUserId={setUserId} />}
      {auth && <div>You are signed in already</div>}
    </>
  )
}

export default Auth

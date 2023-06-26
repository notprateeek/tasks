import React from 'react'
import AuthForm from '../components/AuthForm'
import useAuth from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import SignedIn from '../components/SignedIn'

function Auth({ setUserId }) {
  const { auth } = useAuth()

  return (
    <>
      <Navbar />
      {!auth && <AuthForm setUserId={setUserId} />}
      {auth && <SignedIn />}
    </>
  )
}

export default Auth

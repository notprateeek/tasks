import { useEffect, useState } from 'react'
import axios from 'axios'

export default () => {
  const [auth, setAuth] = useState()

  const verifyAuth = async () => {
    try {
      const data = await axios.get('/api/auth').then((res) => res.data)
      setAuth(data)
      return true
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  return { auth }
}

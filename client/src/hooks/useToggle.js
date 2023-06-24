import { useState } from 'react'

export default () => {
  const [status, setStatus] = useState(false)
  const toggleStatus = () => setStatus((prevStatus) => !prevStatus)
  return { status, toggleStatus }
}

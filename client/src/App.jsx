import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Tasks from './pages/Tasks'
import Auth from './pages/Auth'
import AuthRoute from './components/AuthRoute'

function App() {
  const [userId, setUserId] = useState()

  return (
    <Routes>
      <Route path='/' element={<Auth setUserId={setUserId} />} />
      <Route element={<AuthRoute />}>
        <Route path='/tasks' element={<Tasks userId={userId} />} />
      </Route>
    </Routes>
  )
}

export default App

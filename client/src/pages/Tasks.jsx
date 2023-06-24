import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function Tasks({ userId }) {
  const [tasks, setTasks] = useState([])

  async function getTasks() {
    const { data } = await axios.get('/api/tasks').then((res) => res)
    setTasks(data.sort((a, b) => b.createdAt - a.createdAt))
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <Navbar />
      <TaskForm userId={userId} tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  )
}

export default Tasks

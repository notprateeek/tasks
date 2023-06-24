import React, { useState } from 'react'
import axios from 'axios'
import { Checkbox } from '@chakra-ui/react'

function Tasks({ task, tasks, setTasks }) {
  const [status, toggleStatus] = useState(task.status)
  async function handleCheck(taskId) {
    await axios.put(`api/tasks/${taskId}`, status)
    toggleStatus(!status)
  }

  async function handleDelete(taskId) {
    await axios.delete(`api/tasks/${taskId}`)
    setTasks(tasks.filter((id) => id !== task._id))
    // check above later
  }

  return (
    <>
      <div>
        <Checkbox
          isChecked={status}
          onChange={() => handleCheck(task._id)}
          tabIndex={-1}
        >
          {task.title}
        </Checkbox>
      </div>
      <button type='button' onClick={() => handleDelete(task._id)}>
        remove
      </button>
    </>
  )
}
export default Tasks

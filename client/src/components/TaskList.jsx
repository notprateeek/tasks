import React from 'react'
import TaskItem from './TaskItem'

function TaskList({ tasks, setTasks }) {
  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </>
  )
}

export default TaskList

import React, { useState } from 'react'
import axios from 'axios'
// eslint-disable-next-line object-curly-newline
import { Checkbox, Button, HStack, Stack, Box } from '@chakra-ui/react'

function Tasks({ task, tasks, setTasks }) {
  const [checked, setChecked] = useState(task.status)

  const handleCheck = (taskId) => {
    setChecked(!checked)
    const status = {
      status: checked,
    }
    axios.put(`api/tasks/${taskId}`, status)
  }

  const handleDelete = async (taskId) => {
    await axios.delete(`api/tasks/${taskId}`)
    setTasks(tasks.filter((item) => taskId !== item._id))
  }

  return (
    <HStack mt={4}>
      <Box
        w={{
          base: '75%',
          md: '80%',
        }}
      >
        <Checkbox
          colorScheme='green'
          isChecked={checked}
          onChange={() => handleCheck(task._id)}
        >
          {task.title}
        </Checkbox>
      </Box>
      <Stack
        w={{
          base: '25%',
          md: '20%',
        }}
        justify='flex-end'
        direction='row'
      >
        <Button
          colorScheme='red'
          variant='outline'
          size='xs'
          onClick={() => handleDelete(task._id)}
        >
          Remove
        </Button>
      </Stack>
    </HStack>
  )
}

export default Tasks

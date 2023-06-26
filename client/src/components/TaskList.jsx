/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {
  Box,
  HStack,
  Stack,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import TaskItem from './TaskItem'
import useToggle from '../hooks/useToggle'

function TaskList({ tasks, setTasks }) {
  const { status: hideDone, toggleStatus: setHideDone } = useToggle()
  const [pendingCount, setPendingCount] = useState(0)

  const filter = _.filter(tasks, (item) => !item.status)

  useEffect(() => {
    setPendingCount(filter.length)
  }, [filter])

  const handleClick = () => {
    setHideDone(!hideDone)
  }
  return (
    <>
      <Box
        mt={8}
        py={{ base: 2 }}
        px={{ base: 4 }}
        pb={{ base: 4 }}
        border={1}
        borderStyle='solid'
        borderRadius='md'
        borderColor={useColorModeValue('gray.400', 'gray.700')}
      >
        <HStack mt={2}>
          <Box
            w={{
              base: '50%',
              md: '70%',
            }}
          >
            <Text
              as='span'
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize='xs'
            >
              You have {tasks.length} {tasks.length === 1 ? 'task ' : 'tasks '}
              and {pendingCount} pending.
            </Text>
          </Box>
          <Stack
            w={{
              base: '50%',
              md: '30%',
            }}
            justify='flex-end'
            direction='row'
          >
            <Button
              bg='teal.600'
              color='white'
              colorScheme='teal'
              size='xs'
              onClick={handleClick}
            >
              {hideDone ? 'Show All Tasks' : 'Show Pending'}
            </Button>
          </Stack>
        </HStack>
        {hideDone
          ? filter.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))
          : tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
      </Box>
    </>
  )
}

export default TaskList

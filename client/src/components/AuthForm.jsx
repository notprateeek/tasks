import React, { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ErrorStatus from '../utils/ErrorStatus'

function AuthForm({ setUserId }) {
  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    const { username, password } = values
    const user = {
      username,
      password,
    }

    if (isSignup) {
      try {
        const res = await axios.post('/api/auth/signup', user)
        setUserId(res.data.id)
        navigate('/tasks')
      } catch (error) {
        setErrorMessage(error.message)
      }
    } else {
      try {
        const res = await axios.post('/api/auth/signin', user)
        setUserId(res.data.id)
        navigate('/tasks')
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <Flex align='center' justify='center'>
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading
            fontSize='4xl'
            bgGradient='linear(to-l, #675AAA,#4399E1)'
            bgClip='text'
          >
            Sign in to your account
          </Heading>
          <Text fontSize='lg' color={useColorModeValue('gray.600', 'gray.400')}>
            to start creating your simple tasks
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <ErrorStatus status={errorMessage} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <Input
                  id='username'
                  placeholder='Enter your username'
                  {...register('username')}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <InputGroup size='md'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    {...register('password')}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              {!isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type='submit'
                      bg='blue.600'
                      color='white'
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={isSubmitting}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(true)}>
                      Create a new account
                    </Button>
                  </Stack>
                </>
              )}

              {isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type='submit'
                      bg='green.600'
                      color='white'
                      _hover={{
                        bg: 'green.500',
                      }}
                      isLoading={isSubmitting}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(false)}>
                      I have an account
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default AuthForm

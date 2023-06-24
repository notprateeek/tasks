import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react'
import React from 'react'

function ErrorStatus({ status }) {
  return (
    <>
      {status && (
        <Alert status='error' mb={4}>
          <AlertIcon />
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
    </>
  )
}

export default ErrorStatus

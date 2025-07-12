import { useToast } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'

// Custom hook to globally handle Axios errors and show toast notifications
export function useToastError() {
  // Initialize Chakra UI toast hook
  const toast = useToast()

  useEffect(() => {
    // Add an Axios response interceptor
    const interceptor = axios.interceptors.response.use(
      // If response is successful, just return it
      res => res,

      // If there's an error in the response
      (error: AxiosError) => {
        // Determine error message based on whether it's a server error or network issue
        const msg = error.response
          ? `خطا از سرور: ${error.response.status}` 
          : 'خطا در اتصال اینترنت'         

        // Show error toast notification
        toast({
          title: 'خطا',
          description: msg,
          status: 'error',
          duration: 5000,
          isClosable: true
        })

        // Re-throw the error for further handling if needed
        return Promise.reject(error)
      }
    )

    // Clean up: remove the interceptor when component unmounts
    return () => axios.interceptors.response.eject(interceptor)
  }, [toast])
}

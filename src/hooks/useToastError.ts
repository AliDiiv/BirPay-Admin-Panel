import { useToast } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'

export function useToastError() {
  const toast = useToast()

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      res => res,
      (error: AxiosError) => {
        const msg = error.response
          ? `خطا از سرور: ${error.response.status}`
          : 'خطا در اتصال اینترنت'
        toast({
          title: 'خطا',
          description: msg,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
        return Promise.reject(error)
      }
    )
    return () => axios.interceptors.response.eject(interceptor)
  }, [toast])
}

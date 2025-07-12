import { SimpleGrid, Skeleton, Box, useToast } from '@chakra-ui/react'
import StatCard from './StatCard'
import { useEffect, useState } from 'react'
import { MdDateRange } from 'react-icons/md'
import { FaPiggyBank } from 'react-icons/fa'
import { FiRepeat, FiHash } from 'react-icons/fi'
import axios from 'axios'
import { useToastError } from '../../hooks/useToastError'

type ApiCard = {
  label: string
  icon: string
  value: string
  footer: string
}

const iconMap: Record<string, JSX.Element> = {
  MdDateRange: <MdDateRange />,
  FaPiggyBank: <FaPiggyBank />,
  FiRepeat: <FiRepeat />,
  FiHash: <FiHash />
}

export default function DashboardContent() {
  const [data, setData] = useState<ApiCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [wrongCode, setWrongCode] = useState(false)
  const toast = useToast()
  useToastError()

  useEffect(() => {
    axios.get<ApiCard[]>('http://localhost:3000/dashboardStats')
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.error(err)
        setWrongCode(true)
        toast({
          title: 'خطا در دریافت اطلاعات!',
          status: 'error',
          isClosable: true
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])


  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
      {isLoading
        ? Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} height="130px" borderRadius="lg" />
        ))
        : data.map((item, i) => (
          <Box key={i}>
            <StatCard
              icon={iconMap[item.icon]}
              label={item.label}
              value={item.value}
              footer={item.footer}
            />
          </Box>
        ))}
    </SimpleGrid>
  )
}

import {
  Box, Input, Select, Button, SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react'
import { FiDownload } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchTxs } from '../../types/txSlice'
import type { AppDispatch } from '../../types/store'
import { useEffect } from 'react'

type FilterForm = {
  search: string
  amountFilter: 'low' | 'high' | ''
  statusFilter: 'success' | 'fail' | ''
  pspFilter: string
}

export default function TransactionTableFilters() {
  const bg = useColorModeValue('white', '#021726')
  const dispatch = useDispatch<AppDispatch>()
  const { register, watch } = useForm<FilterForm>({
    defaultValues: {
      search: '',
      amountFilter: '',
      statusFilter: '',
      pspFilter: ''
    }
  })

  // watch for live search and filters
  const values = watch()

  useEffect(() => {
    dispatch(fetchTxs(values))
  }, [dispatch, values])

  const handleDownload = () => {
    // Download and paste CSV here
    console.log('Download with filters:', values)
  }

  return (
    <Box p={4} bg={bg} borderRadius="lg" boxShadow="md" mt={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={3}>
        <Button
          leftIcon={<FiDownload />}
          variant="solid"
          colorScheme="teal"
          w="100%"
          onClick={handleDownload}
        >
          دانلود
        </Button>

        <Input
          placeholder="جستجو"
          w="100%"
          {...register('search')}
        />

        <Select placeholder="فیلتر مبلغ" w="100%" {...register('amountFilter')}>
          <option value="low">کم</option>
          <option value="high">زیاد</option>
        </Select>

        <Select placeholder="وضعیت تراکنش" w="100%" {...register('statusFilter')}>
          <option value="success">موفق</option>
          <option value="fail">ناموفق</option>
        </Select>

        <Select placeholder="PSP" w="100%" {...register('pspFilter')}>
          <option value="zarinpal">زرین‌پال</option>
          <option value="shaparak">شاپرک</option>
        </Select>
      </SimpleGrid>
    </Box>
  )
}

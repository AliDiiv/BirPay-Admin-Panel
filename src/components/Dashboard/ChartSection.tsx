import {
  Box, Heading, Button, ButtonGroup, Select, Link, Alert, AlertIcon,
  Flex, useColorModeValue, Skeleton
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChart } from '../../types/chartSlice'
import type { RootState, AppDispatch } from '../../types/store'

type ChartPoint = { day: string; value: number }

export default function ChartSection() {
  const [selectedTab, setSelectedTab] = useState<'count' | 'amount'>('count')
  const [period, setPeriod] = useState<'روزانه' | 'ماهانه'>('روزانه')
  const [gateway, setGateway] = useState<string>('woodshop')

  const dispatch = useDispatch<AppDispatch>()
  const { data: chartData, isLoading } = useSelector((s: RootState) => s.chart)

  const bg = useColorModeValue('white', '#021726')
  const gateways = [
    { label: 'فروشگاه دست‌سازه‌های چرمی هایلی', value: 'woodshop' },
    { label: 'دفتر ترجمه آلپ', value: 'test' }
  ]

  useEffect(() => {
    dispatch(fetchChart({ gateway, period, type: selectedTab }))
  }, [gateway, period, selectedTab, dispatch])

  return (
    <Box p={4} bg={bg} borderRadius="lg" boxShadow="md" mt={4}>
      <Heading size="sm" mb={4}>نمودار تراکنش‌های درگاه</Heading>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={4} mb={4}>
        <Select
          value={period}
          onChange={e => setPeriod(e.target.value as any)}
          w="120px"
          textAlign="center"
          pr="-2.5rem"
        >
          <option value="روزانه">روزانه</option>
          <option value="ماهانه">ماهانه</option>
        </Select>
        <ButtonGroup variant="outline">
          <Button
            isActive={selectedTab === 'count'}
            onClick={() => setSelectedTab('count')}
          >
            تعداد تراکنش
          </Button>
          <Button
            isActive={selectedTab === 'amount'}
            colorScheme="teal"
            onClick={() => setSelectedTab('amount')}
          >
            مبلغ تراکنش
          </Button>
        </ButtonGroup>
      </Flex>

      <Alert status="info" borderRadius="md" mb={4} fontSize="sm">
        <AlertIcon />
        لطفاً درگاه مورد نظر را انتخاب کنید.
        جهت مشاهده کامل گزارش‌ها به
        <Link color="blue.500" mx={1} href="#">صفحه درگاه‌ها</Link>
        مراجعه کنید.
      </Alert>

      <Flex mb={4} justify="space-between" direction={{ base: 'column', md: 'row' }} gap={3}>
        <Select
          value={gateway}
          onChange={e => setGateway(e.target.value)}
          w={{ base: '100%', md: '300px' }}
        >
          {gateways.map(gw => (
            <option key={gw.value} value={gw.value}>{gw.label}</option>
          ))}
        </Select>
        <Link color="blue.500" fontSize="sm" href="#">مشاهده گزارش کامل</Link>
      </Flex>

      <Box h="220px">
        {isLoading ? (
          <Skeleton height="100%" borderRadius="md" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData as ChartPoint[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={selectedTab === 'amount' ? '#3182ce' : '#2b6cb0'}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  )
}

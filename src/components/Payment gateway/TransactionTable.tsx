import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Skeleton,
  useColorModeValue
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../types/store'
import EmptyState from './EmptyState'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react'

export default function TransactionTable() {
  const { data, isLoading } = useSelector((s: RootState) => s.transactions)
  const bg = useColorModeValue('white', '#021726')
  return (
    <Box mt={4} bg={bg} p={4} borderRadius="lg" boxShadow="md">
      {isLoading ? (
        <Skeleton height="300px" borderRadius="md" />
      ) : data.length ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>شناسه</Th>
              <Th>وضعیت</Th>
              <Th>تاریخ</Th>
              <Th>مبلغ</Th>
              <Th>کارت</Th>
              <Th>موبایل</Th>
              <Th>PSP</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item: { id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; amount: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; card: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; mobile: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; psp: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }, i: Key | null | undefined) => (
              <Tr key={i}>
                <Td>{item.id}</Td>
                <Td>{item.status}</Td>
                <Td>{item.date}</Td>
                <Td>{item.amount}</Td>
                <Td>{item.card}</Td>
                <Td>{item.mobile}</Td>
                <Td>{item.psp}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <EmptyState />
      )}
    </Box>
  )
}

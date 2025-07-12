import { Tabs, TabList, Tab, TabPanels, TabPanel, VStack, FormControl, Input, Button, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type Props = {
  onEmailSubmit: (email: string) => void
  onPhoneSubmit: (phone: string) => void
}

// Validation schema for email using Yup
const emailSchema = yup.object({
  email: yup.string().email().required()
})

// Validation schema for Iranian phone number format (starts with 09 and 11 digits total)
const phoneSchema = yup.object({
  phone: yup.string().matches(/^09\d{9}$/).required()
})

export default function AuthTabs({ onEmailSubmit, onPhoneSubmit }: Props) {
  // React Hook Form setup for email form with validation
  const {
    register: re,
    handleSubmit: hsE,
    formState: { errors: ee, isValid: iE }
  } = useForm({ resolver: yupResolver(emailSchema), mode: 'onChange' })

  // React Hook Form setup for phone form with validation
  const {
    register: rp,
    handleSubmit: hsP,
    formState: { errors: ep, isValid: iP }
  } = useForm({ resolver: yupResolver(phoneSchema), mode: 'onChange' })

  return (
    <Tabs isFitted variant="unstyled">
      {/* Tab list to switch between email and phone login */}
      <TabList bg="#0B2A3A" p="2px" borderRadius="md" mb={4}>
        <Tab
          _selected={{ color: 'teal.500', borderBottom: '2px solid', fontWeight: 'bold' }}
          color="gray.300"
        >
          ایمیل
        </Tab>
        <Tab
          _selected={{ color: 'teal.500', borderBottom: '2px solid', fontWeight: 'bold' }}
          color="gray.300"
        >
          شماره موبایل
        </Tab>
      </TabList>

      <TabPanels>
        {/* Email login form */}
        <TabPanel px={0}>
          <form onSubmit={hsE(data => onEmailSubmit(data.email))}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!ee.email}>
                <Input
                  {...re('email')}
                  placeholder="example@mail.com"
                  bg="#0F2C3F"
                  color="white"
                />
                {/* Display validation error for email */}
                <Text fontSize="sm" color="red.400">{ee.email?.message}</Text>
              </FormControl>
              <Button type="submit" width="full" colorScheme="teal" isDisabled={!iE}>
                ادامه
              </Button>
            </VStack>
          </form>
        </TabPanel>

        {/* Phone login form */}
        <TabPanel px={0}>
          <form onSubmit={hsP(data => onPhoneSubmit(data.phone))}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!ep.phone}>
                <Input
                  {...rp('phone')}
                  placeholder="09147037449"
                  bg="#0F2C3F"
                  color="white"
                />
                {/* Display validation error for phone */}
                <Text fontSize="sm" color="red.400">{ep.phone?.message}</Text>
              </FormControl>
              <Button type="submit" width="full" colorScheme="teal" isDisabled={!iP}>
                ادامه
              </Button>
            </VStack>
          </form>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

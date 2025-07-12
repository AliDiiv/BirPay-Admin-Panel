
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Icon } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export default function UserInfoForm() {
  return (
    <VStack spacing={4} mt={4} w="full">
      <FormControl>
        <FormLabel>پست الکترونیکی</FormLabel>
        <InputGroup>
          <Input defaultValue="ali20013.amj@gmail.com" isReadOnly
            textAlign="center"
            pr="-2.5rem" />
          <InputRightElement><Icon as={CheckIcon} color="green.500" /></InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>موبایل</FormLabel>
        <InputGroup>
          <Input defaultValue="09147037449" isReadOnly
            textAlign="center"
            pr="-2.5rem" />
          <InputRightElement><Icon as={CheckIcon} color="green.500" /></InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>نام</FormLabel>
        <Input defaultValue="علی محمد جعفری" isReadOnly
          pr="-2.5rem" />
      </FormControl>
    </VStack>
  )
}

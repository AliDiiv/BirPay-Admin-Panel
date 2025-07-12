import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../types/store'
import { fetchUser, saveUser, setAvatar } from '../../types/userSlice'
import SidebarTabs from './SidebarTabs'
import AvatarPicker from './AvatarPicker'
import UserInfoForm from './UserInfoForm'
import RequiredDocuments from './RequiredDocuments'
import { Flex, Box, Button, Spinner, useColorModeValue } from '@chakra-ui/react'

export default function UserProfile() {
  const dispatch = useDispatch<AppDispatch>()
  const { profile, isLoading, isSaving } = useSelector((s: RootState) => s.user)
  const bg = useColorModeValue('white', '#021726')
  const bg1 = useColorModeValue('#EFF2F5', '#092030')

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const handleSave = () => {
    if (profile) dispatch(saveUser(profile))
  }

  if (isLoading || !profile) return <Spinner mt={10} />

  return (
    <Flex direction={{ base: 'column', md: 'row' }} p={4} bg={bg1} minH="50vh" gap={4}>
      <SidebarTabs />
      <Box flex="1" bg={bg} p={4} borderRadius="lg" boxShadow="md">
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Box flex="1">
            <UserInfoForm
              email={profile.email}
              mobile={profile.mobile}
              name={profile.name}
            />
            <Button
              colorScheme="teal"
              mt={4}
              onClick={handleSave}
              isLoading={isSaving}
            >
              ذخیره تغییرات
            </Button>
          </Box>
          <Box flex="1">
            <AvatarPicker
              avatar={profile.avatar}
              onSelect={(av: any) => dispatch(setAvatar(av))}
            />
            <RequiredDocuments documentUrl={profile.documentUrl} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

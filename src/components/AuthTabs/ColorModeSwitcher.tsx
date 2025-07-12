import { IconButton, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="toggle theme"
      icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
    />
  )
}

export default ColorModeSwitcher

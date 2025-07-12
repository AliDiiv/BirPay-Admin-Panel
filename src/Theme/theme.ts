// src/theme/theme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  fonts: {
    heading: 'IRANYekanX, sans-serif',
    body: 'IRANYekanX, sans-serif'
  },
   components: {
    Heading: {
      baseStyle: {
        fontWeight: '700',
      },
      sizes: {
        xl: {
          fontSize: '4xl',
        },
        lg: {
          fontSize: '3xl',
        },
      },
      defaultProps: {
        size: 'lg',
      },
    },
  },
   styles: {
    global: {
      '::selection': {
        backgroundColor: '#10b981',
        color: 'white',
      },
    },
  },
})

export default theme

import { extendTheme } from '@chakra-ui/react';

const colors = {
  black: {
    50: '#e4e4e4',
    100: '#bababa',
    200: '#8e8e8e',
    300: '#626262',
    400: '#3b3b3b',
    500: '#1c1c1c',
    600: '#191919',
    700: '#141414',
    800: '#0f0f0f',
    900: '#060606',
  },
  red: {
    50: '#ffe5e5',
    100: '#fcb3b3',
    200: '#f18080',
    300: '#e64c4c',
    400: '#db1f1f',
    500: '#c11515',
    600: '#970f0f',
    700: '#6d0a0a',
    800: '#440404',
    900: '#1f0000',
  },
};

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: 'black.900',
        color: 'white',
      },
    },
  },
});

export default theme;

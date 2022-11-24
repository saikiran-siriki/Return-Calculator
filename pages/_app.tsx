import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    success: {
      main: '#66e3c4',
      light: 'red'
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
}
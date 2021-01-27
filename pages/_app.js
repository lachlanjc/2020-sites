import { GeistProvider, CssBaseline } from '@geist-ui/react'

const theme = {
  font: {
    sans:
      'ui-rounded, "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default MyApp

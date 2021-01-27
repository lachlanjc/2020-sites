import { GeistProvider, CssBaseline } from '@geist-ui/react'
import PlausibleProvider from 'next-plausible'

const theme = {
  font: {
    sans:
      'ui-rounded, "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="2020-sites.lachlanjc.com">
      <GeistProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </PlausibleProvider>
  )
}

export default MyApp

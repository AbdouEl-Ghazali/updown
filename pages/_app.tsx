import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>

      {/* Google Analytics Tag */}
      <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-57B6E619D4"></Script>
      <Script async strategy="afterInteractive" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-57B6E619D4');
        `}
      </Script>
    </>
  )
}

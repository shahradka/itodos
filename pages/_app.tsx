import '../styles/globals.css'
import type {ReactElement, ReactNode} from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

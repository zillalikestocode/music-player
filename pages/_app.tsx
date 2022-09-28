//@tsc-nocheck
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {Provider} from 'react-redux'
import {store} from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  const { session }: any = pageProps;

  return (
    <SessionProvider session={session}>
        <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

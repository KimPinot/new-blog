import "styles/taiwindcss.css";
import "styles/globals.css";
import type { AppProps } from "next/app";
import AlertContextProvider from "contexts/AlertContext";
import { Header } from "components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertContextProvider>
      <Header />
      <Component {...pageProps} />
    </AlertContextProvider>
  );
}

export default MyApp;

import "styles/globals.css";
import "styles/taiwindcss.scss";
import "highlight.js/scss/atom-one-light.scss";
import type { AppProps } from "next/app";
import { Header } from "components/Header";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>nabi.kim</title>
        <meta name="og:type" content="blog" />
        <meta name="og:locale" content="ko_KR" />
        <meta property="og:url" content="https://nabi.kim" />
        <meta property="og:title" content="nabi.kim" />
        <meta property="og:site_name" content="nabi.kim" />
        <meta property="og:description" content="평범한 기술 블로그" />
        <meta property="og:image" content="https://nabi.kim/assets/opengraph.png" />
        <meta property="og:image:alt" content="회색의 배경 중간에 김나비 캐릭터가 있습니다." />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kim_na_bi_" />
        <meta name="twitter:creator" content="@kim_na_bi_" />
        <link rel="apple-touch-icon" href="/assets/favicon.png" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-FSPPFRL14L" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FSPPFRL14L');
        `}
      </Script>
    </>
  );
}

export default MyApp;

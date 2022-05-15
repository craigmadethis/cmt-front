import Head from 'next/head'
import '../styles/globals.css'
import {useEffect} from 'react'
// https://sachinchoolur.github.io/lightgallery.js/
import {LightgalleryProvider} from "react-lightgallery"
import "lightgallery.js/dist/css/lightgallery.css"
import  {DefaultSeo} from "next-seo"
import SEO from '../next-seo.config'
import Script from 'next/script'
import {useRouter} from 'next/router'
import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
 const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <LightgalleryProvider 
    lightgallerySettings={ { 'download':false } }
    >
    <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
    <DefaultSeo {...SEO} />
  <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}></Script>
  <Script>
    {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${process.env.NEXT_PUBLIC_GTAG}');
      `}
  </Script>
    <Component {...pageProps} />
    </LightgalleryProvider>

  )
}

export default MyApp

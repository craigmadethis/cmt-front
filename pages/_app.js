import Head from 'next/head'
import '../styles/globals.css'
// https://sachinchoolur.github.io/lightgallery.js/
import {LightgalleryProvider} from "react-lightgallery"
import "lightgallery.js/dist/css/lightgallery.css"
import  {DefaultSeo} from "next-seo"
import SEO from '../next-seo.config'

function MyApp({ Component, pageProps }) {
  return (
    <LightgalleryProvider 
    lightgallerySettings={ { 'download':false } }
    >
    <DefaultSeo {...SEO} />
    <Head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    </Head>
    <Component {...pageProps} />
    </LightgalleryProvider>

  )
}

export default MyApp

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
    <Component {...pageProps} />
    </LightgalleryProvider>

  )
}

export default MyApp

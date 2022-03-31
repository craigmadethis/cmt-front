import '../styles/globals.css'
import {LightgalleryProvider} from "react-lightgallery"
import "lightgallery.js/dist/css/lightgallery.css"

function MyApp({ Component, pageProps }) {
  return (
    <LightgalleryProvider 
    lightgallerySettings={ { 'download':false } }
    >
    <Component {...pageProps} />
    </LightgalleryProvider>

  )
}

export default MyApp

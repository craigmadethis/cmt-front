import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {ProseLayout, GalleryLayout} from '../../components/layouts'
import InitClient from "../../lib/client"
import { POST_BY_SLUG, POST_SLUGS, GET_GALLERY_IMAGES, GET_GALLERY_SLUGS, GET_SOCIALS} from '../../lib/queries'
import {NextSeo} from 'next-seo'

const Me = ({gallery, socials}) => {

  const {attributes: {title, description}} = gallery
  return (
    <>
    <NextSeo title={title} description={description}/>
    <GalleryLayout gallery={gallery} socials={socials}/>
    </>
  )
}

export default Me;

export const getStaticProps = async ({params}) => {

  let {slug} = params

  const client = InitClient()

  const {data:{galleries: {data: galleryData}}} = await client.query(
    {
      query: gql(GET_GALLERY_IMAGES), 
      variables:{slug:slug}
    }
  )

  const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )


    return {
        props: {
            gallery: galleryData[0],
            socials: socialsData
        }
    }
}

export const getStaticPaths = async () => {
  const client = InitClient()

  const {data: {galleries:{data: galleryData}}} = await client.query({
    query: gql(GET_GALLERY_SLUGS)  
  })
  // let {galleries:{data: galleryData}} = data
  let paths = []
  galleryData.forEach(gallery => paths.push({params: {slug: gallery.attributes.slug } }))

  return {
    paths: paths, 
    fallback: false
  }
}

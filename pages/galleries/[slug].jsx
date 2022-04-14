import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {ProseLayout, GalleryLayout} from '../../components/layouts'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'
import InitClient from "../../lib/client"
import { POST_BY_SLUG, POST_SLUGS, GET_GALLERY_IMAGES, GET_GALLERY_SLUGS, GET_SOCIALS} from '../../lib/queries'
import {LightgalleryItem} from "react-lightgallery"

const Me = ({gallery, socials}) => {
  let {attributes: {images: {data: allImages}, title, description}} = gallery

  console.log(socials)
  return (
    <GalleryLayout gallery={gallery} socials={socials}/>
  )
}

export default Me;

export const getStaticProps = async ({params}) => {

  let {slug} = params

  const client = InitClient()
  // const client = new ApolloClient({
  //   // uri: 'https://cmt-back.herokuapp.com/graphql',
  //   uri: 'http://localhost:1337/graphql',
  //   cache: new InMemoryCache(),
  // });
  // this is whatever the page is so here it's [slug], if it was [id] then {id} = params https://nextjs.org/docs/api-reference/data-fetching/get-static-props

  //


  const {data:{galleries: {data: galleryData}}} = await client.query(
    {
      query: gql(GET_GALLERY_IMAGES), 
      variables:{slug:slug}
    }
  )

  const {data: {socials: {data: socialsData}}} = await client.query(
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

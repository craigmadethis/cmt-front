import {gql} from '@apollo/client'
import {ProseLayout, GalleryLayout} from '../../components/layouts'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'
import client from "../../lib/client"
import { POST_BY_SLUG, POST_SLUGS, GET_GALLERY_IMAGES} from '../../lib/queries'
import {LightgalleryItem} from "react-lightgallery"

const Me = ({gallery}) => {
  let {attributes: {images: {data: allImages}, title, description}} = gallery

  return (
    <GalleryLayout gallery={gallery} />
  )
}

export default Me;

export const getStaticProps = async () => {
  // this is whatever the page is so here it's [slug], if it was [id] then {id} = params https://nextjs.org/docs/api-reference/data-fetching/get-static-props

  //


  const {data} = await client.query(
    {
      query: gql(GET_GALLERY_IMAGES), 
      variables:{slug:"portfolio"}
    }
  )

  let {galleries: {data: galleryData}} = data;
    return {
        props: {
            gallery: galleryData[0],
        }
    }
}

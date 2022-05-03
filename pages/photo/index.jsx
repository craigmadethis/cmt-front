import {gql} from '@apollo/client'
import {GalleryLayout} from '../../components/layouts'
import InitClient from "../../lib/client"
import {GET_GALLERY_IMAGES, GET_SOCIALS} from '../../lib/queries'
import {NextSeo} from "next-seo"


const Me = ({gallery, socials}) => {

  return (
    <>
  <NextSeo title={'Portfolio'} description={'The photography portfolio of @craigmadethis.'}/>
    <GalleryLayout gallery={gallery} socials={socials}/>
    </>
  )
}

export default Me;

export const getStaticProps = async () => {

  const client = InitClient()
  // this is whatever the page is so here it's [slug], if it was [id] then {id} = params https://nextjs.org/docs/api-reference/data-fetching/get-static-props

  const {data: {galleries: {data: galleryData}}} = await client.query(
    {
      query: gql(GET_GALLERY_IMAGES), 
      variables:{slug:"portfolio"}
    }
  )

  const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )
  // let {galleries: {data: galleryData}} = await data;
    return {
        props: {
          gallery: galleryData[0],
          socials: socialsData,
        }
    }
}

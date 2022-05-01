import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {useEffect} from 'react'
import {ProseLayout} from '../../../components/layouts'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'
import {LightgalleryItem} from "react-lightgallery"
import client from "../../../lib/client"
import { POST_BY_SLUG, POST_SLUGS, GET_SOCIALS} from '../../../lib/queries'
import { getStrapiURL, getStrapiMedia} from '../../../lib/getstrapiurl'
import InitClient from '../../../lib/client'
import Link from 'next/link'
import {NextSeo} from 'next-seo'
import renderers from '../../../lib/renderers'


const Post = ({post,categories, socials}) => {
  const {attributes:{title: postTitle, created: postCreated, createdAt: postCreatedAt, description: postDescription, content: postContent, gallery: postGallery, cover: {data: {attributes:  postCover}}} } = post

  const titleString = `${postTitle} | @CRAIGMADETHIS`
  const seo = {
    title: postTitle, description: postDescription,
    openGraph: {title: titleString, description: postDescription, type: 'article', article: {publishedTime: postCreated}, images:[{...postCover}]},
  }

  const {data: galleryData} = postGallery || {}
  const {attributes: galleryAttributes} = galleryData || {}
  const {title: galleryTitle = '', slug: gallerySlug = ''} = galleryAttributes || {}

  const postDate = new Date(postCreated)


  return (
    <>
    <NextSeo 
    {...seo}
    />
    <ProseLayout socials={socials}>
    <div className='col-span-8 max-w-7xl mx-auto min-h-fit '>
    <h1 className ="text-center mb-2 py-4 col-span-8 mx-auto text-d3 md:text-d2 font-semibold font-jost leading-normal text-blue-400">{postTitle}</h1>
    <h3 className="text-center text-p3 md:text-p2 font-jost font-semibold"><span className="text-gray-900 border-b-4 border-blue-400">{postDate.toLocaleDateString('en-GB')}</span></h3>
    <div className="text-center font-bitter text-gray-900 text-p3 md:text-p2 leading-normal w-5/6  mx-auto py-4">{postDescription}</div>

    <div className="markdown my-4">
    <ReactMarkdown components={renderers} transformImageUri={uri => uri.startsWith("http") ? uri : `${uri}` } remarkPlugins={[remarkUnwrapImages]} >
      {postContent}
    </ReactMarkdown>


    {postGallery && postGallery.data != null ?  (

      <div className='col-span-8 md:col-span-6 text-right font-jost font-semibold text-h3'>View the gallery: <Link href={`/galleries/${gallerySlug}`}><a>{galleryTitle}</a></Link></div>
    ): null}



    </div>
    </div>

    </ProseLayout>
    </>
  )
}

export default Post;

export const getStaticProps = async ({params}) => {
  const client = InitClient()
  // this is whatever the page is so here it's [slug], if it was [id] then {id} = params https://nextjs.org/docs/api-reference/data-fetching/get-static-props
  let {slug} = params;


  const {data:{posts: {data: postsData}, categories:{data:catsData}}} = await client.query(
    {
      query: gql(POST_BY_SLUG), 
      variables:{slug:`${slug}`}
    }
  )

  const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )

  return {
    props: {
      post: postsData[0],
      categories: catsData,
      socials: socialsData
    }
  }
}

export async function getStaticPaths() {
  const client = InitClient()
  const {data: {posts: {data: postsData}}}= await client.query(
    {
      query: gql(POST_SLUGS)
    }
  )

  return ({
    paths: postsData.map((post) => `/blog/post/${post.attributes.slug}`),
    fallback: false // false or 'blocking'
  });
}

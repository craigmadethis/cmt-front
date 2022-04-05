import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {ProseLayout} from '../../../components/layouts'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'
import {LightgalleryItem} from "react-lightgallery"
import client from "../../../lib/client"
import { POST_BY_SLUG, POST_SLUGS} from '../../../lib/queries'
import { getStrapiURL, getStrapiMedia} from '../../../lib/getstrapiurl'
import InitClient from '../../../lib/client'



const Post = ({post,categories}) => {
  const {attributes:{title: postTitle, created: postCreated, createdAt: postCreatedAt, description: postDescription, content: postContent, gallery: postGallery} } = post

 // var galleryImages = postGallery.data.attributes.images.data


  const renderers = {
    img: (image) =>{ 
      if(image.title) { 
        return (
          <div>
            <div className='mx-auto w-5/6 max-w-4xl aspect-[4/3] relative '>
              <LightgalleryItem src={image.src} group="page">
                <a className=''>
                  <Image className="img-responsive" src={image.src} alt={image.alt} layout='fill' objectFit='contain'  quality='50' />
                </a>
              </LightgalleryItem>
            </div>
            <p className='w-4/6 text-center'>
              {image.title}
            </p>
          </div>
        ) 
      }
      else {
        return (
          <div>
            <div className='mx-auto w-5/6 max-w-6xl aspect-[4/3] relative '>
              <LightgalleryItem src={image.src} group="page">
                <a className=''>
                  <Image className="img-responsive" src={image.src} alt={image.alt} layout='fill' objectFit='contain'  quality='50' />
                </a>
              </LightgalleryItem>
            </div>
          </div>
        )}
    }
  }

  const postDate = new Date(postCreated)
  
  return (
    <ProseLayout>
    <div className='col-span-6 col-start-2'>
    <h1 className ="text-center mb-2 py-4 col-span-8 mx-auto text-d3 md:text-d2 font-semibold font-jost leading-normal text-blue-400">{postTitle}</h1>
    <h3 className="text-center text-p3 md:text-p2 font-jost font-semibold"><span className="text-gray-900 border-b-4 border-blue-400">{postDate.toLocaleDateString('en-GB')}</span></h3>
    <div className="text-center font-bitter text-gray-900 text-p3 md:text-p2 leading-normal w-5/6  mx-auto py-4">{postDescription}</div>
    
    <div className="md my-4">
      <ReactMarkdown components={renderers} transformImageUri={uri => uri.startsWith("http") ? uri : `${uri}` } remarkPlugins={[remarkUnwrapImages]} >
    {postContent}
    </ReactMarkdown>
    </div>
    </div>
    
    </ProseLayout>
  )
}

export default Post;

export const getStaticProps = async ({params}) => {
  const client = InitClient()
  // this is whatever the page is so here it's [slug], if it was [id] then {id} = params https://nextjs.org/docs/api-reference/data-fetching/get-static-props
  let {slug} = params;


  const {data} = await client.query(
    {
      query: gql(POST_BY_SLUG), 
      variables:{slug:`${slug}`}
    }
  )

  let {posts: {data: postsData}, categories:{data:catsData}} = data;
    return {
        props: {
            post: postsData[0],
            categories: catsData,
        }
    }
}

export async function getStaticPaths() {
  const client = InitClient()
  const {data}= await client.query(
    {
      query: gql(POST_SLUGS)
    }
  )

  let {posts: {data: postsData}} = data;


  return ({
    paths: postsData.map((post) => `/blog/post/${post.attributes.slug}`),
    fallback: false // false or 'blocking'
  });
}

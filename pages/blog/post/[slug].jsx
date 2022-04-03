import {gql} from '@apollo/client'
import {ProseLayout} from '../../../components/layouts'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'
import {LightgalleryItem} from "react-lightgallery"
import client from "../../../lib/client"
import { POST_BY_SLUG, POST_SLUGS} from '../../../lib/queries'



const Post = ({post,categories}) => {
  const {attributes:{title: postTitle, createdAt: postCreated, description: postDescription, content: postContent, gallery: postGallery} } = post

 // var galleryImages = postGallery.data.attributes.images.data


  const renderers = {
    img: (image) =>{ 
      if(image.title) { 
        return (
          <div>
            <div className='mx-auto w-full max-w-6xl aspect-[4/3] relative '>
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
            <div className='mx-auto w-full max-w-6xl aspect-[4/3] relative '>
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

  // console.log(postCreated)
  const postDate = new Date(postCreated)
  // console.log(postDate)
  // console.log(postCreated.createdAt.toLocaleDateString('en-GB', {year: 'long', month: 'long', day: 'numeric'}))
  // console.log(navigator.languages)
  
  return (
    <ProseLayout>


    <h1 className ="text-center mb-2 py-4 col-span-8 mx-auto text-d3 md:text-d2 font-semibold font-jost leading-normal text-blue-400">{postTitle}</h1>
    <h3 className="col-span-8 mx-auto text-center text-p3 md:text-p2 font-jost font-semibold"><span className="text-gray-900 border-b-4 border-blue-400">{postDate.toLocaleDateString('en-GB')}</span></h3>
    <div className="col-span-8 text-center font-bitter text-gray-900 text-p3 md:text-p2 leading-normal w-5/6  mx-auto py-4">{postDescription}</div>
    <div className="md col-span-8 my-4">
      <ReactMarkdown components={renderers} transformImageUri={uri => uri.startsWith("http") ? uri : `${uri}` } remarkPlugins={[remarkUnwrapImages]} >
    {postContent}
    </ReactMarkdown>
    </div>
    

    </ProseLayout>
  )
}

export default Post;

export const getStaticProps = async ({params}) => {
  // this is whatever the page is so here it's [slug], if it was [id] then {id} = params https://nextjs.org/docs/api-reference/data-fetching/get-static-props
  let {slug} = params;


  const {data} = await client.query(
    {
      query: gql(POST_BY_SLUG), 
      variables:{slug:`${slug}`}
    }
  )

  let {posts: {data: postsData}, categories:{data:catsData}} = await data;
    return {
        props: {
            post: postsData[0],
            categories: catsData,
        }
    }
}

export async function getStaticPaths() {
  const {data}= await client.query(
    {
      query: gql(POST_SLUGS)
    }
  )

  let {posts: {data: postsData}} = await data;
  postsData.forEach((post) => console.log(post.attributes.slug))
  return {
    paths: postsData.map((post) => `/blog/post/${post.attributes.slug}`),
    fallback: false // false or 'blocking'
  };
}

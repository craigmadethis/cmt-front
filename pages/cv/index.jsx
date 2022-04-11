import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {ProseLayout} from '../../components/layouts'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'
import {LightgalleryItem} from "react-lightgallery"
import client from "../../lib/client"
import { POST_BY_SLUG, POST_SLUGS} from '../../lib/queries'
import { getStrapiURL, getStrapiMedia} from '../../lib/getstrapiurl'
import InitClient from '../../lib/client'



const CV = ({cvData}) => {
  // const {attributes:{content: cvContent, description: cvDescription }} = post

  const {attributes: {content: cvContent, description: cvDescription}} = cvData
  // var galleryImages = postGallery.data.attributes.images.data
  

  return (
    <ProseLayout>
    <div className='col-span-8 md:col-span-6 md:col-start-2'>
    <h1 className ="text-center mb-2 py-4 col-span-8 mx-auto text-d3 md:text-d2 font-semibold font-jost leading-normal text-blue-400">CV</h1>
    <div className="text-center font-bitter text-gray-900 text-p3 md:text-p2 leading-normal w-5/6  mx-auto py-4">{cvDescription}</div>
    
    <div className="md my-4">
      <ReactMarkdown transformImageUri={uri => uri.startsWith("http") ? uri : `${uri}` }>
    {cvContent}
    </ReactMarkdown>
    </div>
    </div>
    
    </ProseLayout>
  )
}

export default CV;

export const getStaticProps = async () => {
  const client = InitClient()


  const {data} = await client.query(
    {
      query: gql`
      query { 
        cvs{
          data{
            attributes{
              description 
              content
            }
          }
        }
      }
      `
    }
  )

  let {cvs: {data:cvData}} = data
  console.log(cvData[0])
  // let {cvs: {data: postsData}, categories:{data:catsData}} = data;

  return {
    props: {
      cvData: cvData[0],
    }
  }
}

// export async function getStaticPaths() {
//   const client = InitClient()
//   const {data}= await client.query(
//     {
//       query: gql(POST_SLUGS)
//     }
//   )

//   let {posts: {data: postsData}} = data;


//   return ({
//     paths: postsData.map((post) => `/blog/post/${post.attributes.slug}`),
//     fallback: false // false or 'blocking'
//   });
// }

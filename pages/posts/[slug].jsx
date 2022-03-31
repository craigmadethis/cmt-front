import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import Navbar from '../../components/nav'
import PostSidebar from '../../components/BlogSidebar'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Footer from '../../components/footer'
import Image from 'next/image'
import reactMarkdown from 'react-markdown'
import {LightgalleryItem} from "react-lightgallery"



const Post = ({post,categories}) => {
  const {attributes:{title: postTitle, createdAt: postCreated, description: postDescription, content: postContent, gallery: postGallery} } = post

 var galleryImages = postGallery.data.attributes.images.data


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
	<div className='bg-gray-50 min-h-screen'>
    <Navbar />


    <div className="w-full px-2 md:px-0 md:w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6 ">
    {/* <div className="col-span-8 grid grid-cols-8"> */}
    <div className="col-span-12 grid grid-cols-8 border-b-2 border-gray-400">
    <h1 className ="text-center mb-2 py-4 col-span-8 mx-auto text-d3 md:text-d2 font-semibold font-jost leading-normal text-blue-400">{postTitle}</h1>
    <h3 className="col-span-8 mx-auto text-center text-p3 md:text-p2 font-jost font-semibold"><span className="text-gray-900 border-b-4 border-blue-400">{postDate.toLocaleDateString('en-GB')}</span></h3>
    <div className="col-span-8 text-center font-bitter text-gray-900 text-p3 md:text-p2 leading-normal w-5/6  mx-auto py-4">{postDescription}</div>
    <div className="md col-span-8 my-4">
      <ReactMarkdown children={postContent} components={renderers} transformImageUri={uri => uri.startsWith("http") ? uri : `http://localhost:1337${uri}` } remarkPlugins={[remarkUnwrapImages]} />
    </div>
    </div>
    {postGallery.data[0] ? (
      <h1 className='col-span-12 text-right font-jost text-h3 md:text-h2 capitalize font-semibold'>View Gallery -></h1>
    ) : null}
    </div>
    

    <Footer/>
    </div>
  )
}

export default Post;

export const getStaticProps = async ({params}) => {
  // this is whatever the page is so here it's [slug], if it was [id] then {id} = params https://nextjs.org/docs/api-reference/data-fetching/get-static-props
  let {slug} = params;
    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache(),
    });
  const {data} = await client.query({
    query: gql(`
    query ($slug: String!){
      posts(filters: {slug: {eq: $slug}}){
        data{
          attributes{
            title
            content
            createdAt
            description
            gallery {
              data {
                attributes {
                  images {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      categories {
        data {
          attributes {
            category
          }
        }
      }
    }`), 
    variables:{slug:`${slug}`}})
  let {posts: {data: postsData}, categories:{data:catsData}} = data;
    return {
        props: {
            post: postsData[0],
            categories: catsData,
        }
    }
}

export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache(),
    });
  const {data} = await client.query({
    query: gql`
    query {
      posts{
        data{
          attributes{
            slug
          }
        }
      } 
    }`})
  let {posts: {data: postsData}} = data;
  return {
    paths: postsData.map((post) => `/posts/${post.attributes.slug}`),
    fallback: true // false or 'blocking'
  };
}

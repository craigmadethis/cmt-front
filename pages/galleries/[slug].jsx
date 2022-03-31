import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import Navbar from '../../components/nav'
import PostSidebar from '../../components/BlogSidebar'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Footer from '../../components/footer'
import Image from 'next/image'
import reactMarkdown from 'react-markdown'
import {LightgalleryItem} from "react-lightgallery"
import "lightgallery.js/dist/css/lightgallery.css";

const Post = ({post, galleries}) => {
  // console.log(galleries.attributes.images.data)
  const imageData = galleries.attributes.images.data

  console.log(imageData)
  const PhotoItem = ( {image}) => (
    <div className='w-full '>
    <LightgalleryItem  src={image} thumb={image} group='all'>
      <img src={image}/>
    </LightgalleryItem>
    </div>
  );
  
  // const renderers = {
  //   img: (image) => (image.title) ? (
  //     <div>
  //     <div className='mx-auto w-full max-w-6xl aspect-[4/3] relative '>
  //       <Image src={image.src} alt={image.alt} layout='fill' objectFit='contain'  quality='50' />
  //     </div>
  //     <p className='w-4/6 text-center'>
  //     {image.title}
  //     </p>
  //     </div>
  //   ) : (
  //     <div className='mx-auto w-full aspect-[4/3] relative'>
  //     <Image src={image.src} alt={image.alt} layout='fill' objectFit='contain' quality='50' />
  //     </div>
  //   )
  // }

  // console.log(postCreated)
  // const postDate = new Date(postCreated)
  // console.log(postDate)
  // console.log(postCreated.createdAt.toLocaleDateString('en-GB', {year: 'long', month: 'long', day: 'numeric'}))
  // console.log(navigator.languages)
  
  return (
	<div className='bg-gray-50 min-h-screen'>
    <Navbar />


    <div className="w-full px-2 md:px-0 md:w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6 ">
    {/* <div className="col-span-8 grid grid-cols-8"> */}
    <div className="col-span-12 grid grid-cols-8 border-b-2 border-gray-400">
    <h1 className='col-span-12'>{galleries.attributes.title}</h1>

    {imageData.map((image,idx) =>{
      console.log(idx)
      return (
      <PhotoItem key={idx} image={`http://localhost:1337${image.attributes.url}`} />
    )}
    )
    }



    </div>
    {/* <PostSidebar categories={categories}/> */}
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
    query($slug: String!){
      posts{
        data{
          attributes{
            title
          }
        }
      },
      galleries(filters: {slug: {eq: $slug}}){
        data {
          attributes {
            slug
            title
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
    }`), 
    variables:{slug:`${slug}`}})
  let {posts: {data: postsData}, galleries: {data: galleryData}} = data;
    return {
        props: {
            post: postsData[0],
            galleries: galleryData[0]
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
      galleries {
        data {
          attributes {
            slug
          }
        }
      }
    }`})
  let {galleries: {data: galleriesData}} = data;
  return {
    paths: galleriesData.map((gallery) => `/galleries/${gallery.attributes.slug}`),
    fallback: true // false or 'blocking'
  };
}

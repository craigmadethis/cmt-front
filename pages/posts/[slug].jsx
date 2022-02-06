import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import Navbar from '../../components/nav'
import PostSidebar from '../../components/BlogSidebar'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Footer from '../../components/footer'
import Image from 'next/image'


const Post = ({posts,categories}) => {
  let post = posts[0].attributes

  // const renderers = {paragraph: (paragraph) => {
  //   const { node } = paragraph;
  //   if (node.children[0].type === "image") {
  //     const image = node.children[0];
  //     return <div className='w-full'><Image src={image.url} alt={image.alt}  /></div>;
  //   }
  //   return <p className='w-4/6'>{paragraph.children}</p>;
  // },
  // }
  
  const renderers = {image: (image) =>{
    return <Image src={image.url} alt={image.alt} />
  }}
  
  return (
	<div className='bg-gray-50 min-h-screen'>
    <Navbar />


    <div className="w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6 ">
    {/* <div className="col-span-8 w-full prose prose-h1:md_h1"> */}
    <div className="col-span-8 md grid grid-cols-8">
    <h1 className ="text-center py-4 col-span-8 mx-auto">{post.title}</h1>
    <h3 className="col-span-8 mx-auto "><span className="text-gray-900">12/01/96</span></h3>
    <div className="col-span-8">
    <ReactMarkdown children={post.content} components={renderers} transformImageUri={uri => uri.startsWith("http") ? uri : `http://localhost:1337${uri}` } remarkPlugins={remarkUnwrapImages} />
    </div>
    </div>
    <PostSidebar categories={categories}/>
    </div>
    <Footer/>
    </div>
  )
}

export default Post;

export const getStaticProps = async ({params}) => {
  let {slug} = params;
    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache(),
    });
  const {data} = await client.query({
    query: gql(`
    query ($slug: String!){
      posts(filters:{slug:{eq: $slug}}){
        data{
          attributes{
            title
            content
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
            posts: postsData,
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

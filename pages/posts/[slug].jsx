import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import Navbar from '../../components/nav'
import PostSidebar from '../../components/BlogSidebar'
import ReactMarkdown from 'react-markdown'


const Post = ({posts,categories}) => {
  let post = posts[0].attributes
  let markdown = `
  # hello this is a title. 
  hellooooo

  wow
  `
  return (
	<div className='bg-gray-50 min-h-screen'>
    <Navbar />


    <div className="w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6 ">
    {/* <div className="col-span-8 w-full prose prose-h1:md_h1"> */}
    <div className="col-span-8 w-full md">
    <ReactMarkdown children={markdown}/>
    </div>
    <PostSidebar categories={categories}/>
    </div>
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

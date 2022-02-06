import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import Navbar from '../../components/nav'

const Post = ({posts}) => {
  let post = posts[0].attributes
  return (
  <>
  <Navbar />
  <div><h1>{post.title}</h1></div>
  </>
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
          }
        }
      } 
    }`), 
    variables:{slug:`${slug}`}})
  let {posts: {data: postsData}} = data;
    return {
        props: {
            posts: postsData,
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

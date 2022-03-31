import Head from 'next/head'
// import Image from 'next/image'
import Navbar from '../components/nav'
import Footer from '../components/footer'
import PostSidebar from '../components/BlogSidebar'
import PostGrid from '../components/postgrid'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'

export default function Home({posts, categories}) {
  return (
	<div className='bg-gray-50 min-h-screen flex flex-col h-screen justify-between'>
      <Head> <title>craigmadethis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar />
    {/* lets make a grid */}

    <div className="w-full px-4 mb-auto md:px-0 md:w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6  justify-between ">
      <PostGrid posts={posts} />
      <PostSidebar categories={categories} />
    </div>
    <Footer />
	</div>
  )
}

export const getStaticProps = async ({params}) => {
    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache(),
    });
  const {data} = await client.query({
    query: gql`
    query {
      posts(pagination:{pageSize:3, page:1}, sort:"createdAt"){
        data{
          attributes{
            title
            description
            slug
            createdAt
            updatedAt
            cover {
              data {
                attributes {
                  name
                  url
                }
              }
            }
          }
        }
      }, 
        categories {
          data {
            attributes{
              category
            }
          }
        }

    }`})
  let {posts: {data: postsData}, categories: {data: catsData}} = data;
    return {
        props: {
            posts: postsData,
            categories: catsData,
        }
    }
}


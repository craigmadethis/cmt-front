import Head from 'next/head'
// import Image from 'next/image'
import {SidebarLayout} from '../components/layouts'
import PostSidebar from '../components/BlogSidebar'
import PostGrid from '../components/postgrid'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import client from '../lib/client'
import {POST_LIST} from '../lib/queries'

export default function Home({posts, categories}) {

return  (
    <SidebarLayout categories={categories}>
      <PostGrid posts={posts} full={false} />
    </SidebarLayout>

  )
}

export const getStaticProps = async () => {
  const {data} = await client.query(
    {
    query: gql(POST_LIST),
    variables:{pageNum:1, size:1}
    }
  )
  let {posts: {data: postsData}, categories: {data: catsData}} = data;
    return {
        props: {
            posts: postsData,
            categories: catsData,
        }
    }
}


// import Image from 'next/image'
import {SidebarLayout} from '../../components/layouts'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import PostGrid from '../../components/postgrid'
import client from '../../lib/client'
import postperpage from '../../lib/postperpage'
import {POST_LIST, PAGE_DATA} from '../../lib/queries'


export default function Home({posts, categories}) {
return  (
    <SidebarLayout categories={categories}>
      <PostGrid posts={posts} full={false} />
    </SidebarLayout>

  )
}

export const getStaticProps = async ({params}) => {
  let {id} = params
  const {data} = await client.query(
    {
    query: gql(POST_LIST),
    variables:{pageNum:parseInt(id), size:postperpage}
    }
  )
  let {posts: {data: postsData}, categories: {data: catsData}} = await data;
    return {
        props: {
            posts: postsData,
            categories: catsData,
        }
    }
}

export const getStaticPaths = async () => {

  const client = new ApolloClient({
    uri: 'https://cmt-back.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  const {data} = await client.query(
    {
    query: gql(PAGE_DATA),
    variables:{size:1},
    }
  )
  let {posts:{meta: {pagination: {total: totalPages}}}} = await data
  console.log(totalPages)

  // let pageIds = []
  // for(let i=1; i<=totalPages; i++){
  //   pageIds.push(`/blog/${i}`)
  // }


  return {
    paths: ['/blog/1', '/blog/2'],
    // paths: pageIds,
    fallback:false,
  }


}

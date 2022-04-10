// import Image from 'next/image'
import {gql} from '@apollo/client'
import {SidebarLayout} from '../../components/layouts'
import PostGrid from '../../components/postgrid'
import InitClient from '../../lib/client'
import postperpage from '../../lib/postperpage'
import {POST_LIST, PAGE_DATA} from '../../lib/queries'
import{ useRouter, withRouter } from 'next/router'


const Home = (props) => {
  let {posts, categories, pagination} = props

return  (
  <>
    <SidebarLayout categories={categories}>
      <PostGrid posts={posts} pagination ={pagination} full={false} />
    </SidebarLayout>
  </>

  )
}

export default withRouter(Home);

export const getStaticProps = async ({params}) => {
  const client = InitClient()
  let {id} = params
  const {data} = await client.query(
    {
    query: gql(POST_LIST),
    variables:{pageNum:parseInt(id), size:postperpage}
    }
  )


  let {posts: {data: postsData, meta: {pagination: pagination}}, categories: {data: catsData}} = data;
    return {
        props: {
            posts: postsData,
            categories: catsData,
            pagination: pagination,
        }
    }
}

export const getStaticPaths = async () => {

  const client = InitClient()
  const {data} = await client.query(
    {
    query: gql(PAGE_DATA),
    variables:{size:1},
    }
  )
  let {posts:{meta: {pagination: {pageCount: totalPages}}}} = data

  let pageIds = []
  for(let i=1; i<=totalPages; i++){
    pageIds.push(`/blog/${i}`)
  }


  return {
    // paths: ['/blog/1', '/blog/2'],
    paths: pageIds,
    fallback:false,
  }


}

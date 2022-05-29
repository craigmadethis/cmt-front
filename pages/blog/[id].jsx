// import Image from 'next/image'
import { gql } from '@apollo/client'
import { SidebarLayout } from '../../components/layouts'
import PostGrid from '../../components/postgrid'
import InitClient from '../../lib/client'
import postperpage from '../../lib/postperpage'
import { POST_LIST, PAGE_DATA, GET_SOCIALS } from '../../lib/queries'
import { useRouter, withRouter } from 'next/router'


const Home = (props) => {
  let { posts, categories, pagination, socials } = props


  return (
    <>
      <SidebarLayout categories={categories} socials={socials}>
        <PostGrid posts={posts} pagination={pagination} full={false} />
      </SidebarLayout>
    </>

  )
}

export default withRouter(Home);

export const getStaticProps = async ({ params }) => {
  const client = InitClient()
  let { id } = params
  const { data: {
    posts: {
      data: postsData,
      meta: {
        pagination: pagination }
    },
    categories: {
      data: catsData }
  }
  } = await client.query(
    {
      query: gql(POST_LIST),
      variables: { pageNum: parseInt(id), size: postperpage }
    }
  )

  const { data: { footer: { data: { attributes: { socials: socialsData } } } } } = await client.query(
    { query: gql(GET_SOCIALS) }
  )

  return {
    props: {
      posts: postsData,
      categories: catsData,
      pagination: pagination,
      socials: socialsData,
    }
  }
}

export const getStaticPaths = async () => {

  const client = InitClient()
  const { data: { posts: { meta: { pagination: { pageCount: totalPages } } } } } = await client.query(
    {
      query: gql(PAGE_DATA),
      variables: { size: 1 },
    }
  )


  /// keep this here so I can see the difference, I could generate a set of strings but also just pass params and let nextjs do the work
  // let pageIds = []
  // for(let i=1; i<=totalPages; i++){
  //   pageIds.push(`/blog/${i}`)
  // }

  let pageIds = []
  for (let i = 1; i <= totalPages; i++) {
    pageIds.push(
      { params: { id: `${i}` } }
    )
  }

  return {
    // paths: ['/blog/1', '/blog/2'],
    paths: pageIds,
    fallback: false,
  }


}

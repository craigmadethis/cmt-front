// import Image from 'next/image'
import PostGrid from '../../components/postgrid'
import {gql} from '@apollo/client'
import {SidebarLayout} from '../../components/layouts'
import client from '../../lib/client'
import {CATEGORIES, POSTS_BY_CATEGORY} from '../../lib/queries'

export default function Home({posts, categories}) {
  return (
    <SidebarLayout categories={categories} >
      <PostGrid posts={posts} />
    </SidebarLayout>
  )
}




export const getStaticProps = async ({params}) => {
  let {slug} = params;

  const {data} = await client.query({
    query: gql(POSTS_BY_CATEGORY),
    variables: {category: "photography"}
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


export async function getStaticPaths() {
  const {data} = await client.query(
    {
      query: gql(CATEGORIES)
    }
  )
  let {categories: {data: catData}}=data;
  return {
    paths: catData.map((cat) => `/categories/${cat.attributes.category}`),
    fallback: false // false or 'blocking'
  };
}

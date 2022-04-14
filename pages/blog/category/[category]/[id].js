// import Image from 'next/image'
import PostGrid from '../../../../components/postgrid'
import {gql} from '@apollo/client'
import {SidebarLayout} from '../../../../components/layouts'
import InitClient from '../../../../lib/client'
import postperpage from '../../../../lib/postperpage'
import {POSTS_BY_CAT, GET_CATEGORIES, GET_SOCIALS} from '../../../../lib/queries'
import {withRouter} from 'next/router'

const Home= (props)=> {
  let {posts, categories, pagination, socials} = props

return  (
  <>
    <SidebarLayout categories={categories} socials={socials}>
      <PostGrid posts={posts} pagination ={pagination} full={false} />
    </SidebarLayout>
  </>

  )
}
export default withRouter(Home)


  // let {attributes: {title: postTitle, description:postDescription, slug:postSlug, createdAt:postCreated, updatedAt: postUpdated, cover: {data: {attributes: {name:coverName, url:coverUrl}}}}} = post


export const getStaticProps = async ({params}) => {
  const client = InitClient()
  let {category, id} = params;
  const {data: {posts: {data: postsData, meta: {pagination: pagData}}, categories: {data: catsData}}} = await client.query(
    {
      query: gql(POSTS_BY_CAT), 
      variables:{cat:`${category}`, size: postperpage, pageNum: parseInt(id)}
    }
  )

  const {data:{socials: {data: socialsData }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )
  return {
    props: {
      posts: postsData,
      categories: catsData,
      pagination: pagData,
      socials: socialsData,
    }
  }
}


export async function getStaticPaths() {
  const client = InitClient()
  const {data: {categories: {data: catData}}} = await client.query({
    query: gql(GET_CATEGORIES)})

  async function SubPages(catData){
    let categories = []
    let pageCounts = []
    catData.forEach(cat => categories.push(cat.attributes.category))
    for (let cat of categories){
      const {data: {posts:{meta: {pagination: {pageCount}}}}} = await client.query({
        query: gql`
        query ($cat:String!, $size: Int!){
          posts (pagination:{pageSize:$size},filters:{categories:{category:{eq:$cat}}}) {
            meta {
              pagination{
                pageCount
              }
            }
          }
        }
        `,
        variables:{cat:cat, size: postperpage}
      },
      )
      for(let i = 1; i<=pageCount; i++){
        pageCounts.push({params:{id:i.toString(), category: cat}})
      }
    }
    return pageCounts
  }

  let paths = await SubPages(catData)


return {
    paths:paths,
    fallback: false // false or 'blocking'
  };
}

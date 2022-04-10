// import Image from 'next/image'
import PostGrid from '../../../../components/postgrid'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {SidebarLayout} from '../../../../components/layouts'
import InitClient from '../../../../lib/client'
import postperpage from '../../../../lib/postperpage'
import {POSTS_BY_CAT} from '../../../../lib/queries'
import {withRouter} from 'next/router'

const Home= (props)=> {
  let {posts, categories, pagination} = props

return  (
  <>
    <SidebarLayout categories={categories}>
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
  const {data} = await client.query(
    {
      query: gql(POSTS_BY_CAT), 
      variables:{cat:`${category}`, size: postperpage, pageNum: parseInt(id)}
    }
  )
  let {posts: {data: postsData, meta: {pagination: pagData}}, categories: {data: catsData}} = data;
    return {
        props: {
            posts: postsData,
            categories: catsData,
          pagination: pagData
        }
    }
}


export async function getStaticPaths() {
  const client = InitClient()
  const {data} = await client.query({
    query: gql`
    query {
      categories{
        data{
          attributes{
            category
          }
        }
      } 
    }`})

  let {categories: {data: catData}}= data;


  async function woah(catData){
  let categories = []
  let pageCounts = []
    catData.forEach(cat => categories.push(cat.attributes.category))
    for (let cat of categories){
      const {data} = await client.query({
        query: gql`
        query ($cat:String!){
          posts (pagination:{pageSize:1},filters:{categories:{category:{eq:$cat}}}) {
            meta {
              pagination{
                pageCount
              }
            }
          }
        }
        `,
      variables:{cat:cat}
      },
    )
      let {posts:{meta: {pagination: {pageCount}}}} = data
      for(let i = 1; i<=pageCount; i++){
        pageCounts.push({params:{id:i.toString(), category: cat}})
        }
    }
  return pageCounts
  }

  let paths = await woah(catData)


return {
    paths:paths,
    fallback: false // false or 'blocking'
  };
}

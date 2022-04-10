// import Image from 'next/image'
import PostGrid from '../../components/postgrid'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {SidebarLayout} from '../../components/layouts'
import InitClient from '../../lib/client'
import postperpage from '../../lib/postperpage'

export default function Home({posts, categories}) {
  return (
    <SidebarLayout categories={categories} >
      <PostGrid posts={posts} />
    </SidebarLayout>
  )
}


  // let {attributes: {title: postTitle, description:postDescription, slug:postSlug, createdAt:postCreated, updatedAt: postUpdated, cover: {data: {attributes: {name:coverName, url:coverUrl}}}}} = post


export const getStaticProps = async ({params}) => {
  const client = InitClient()
  let {slug} = params;
  const {data} = await client.query({
    query: gql`
    query ($slug: String!){
      posts (filters: {categories: {category: {eq: $slug}}}) {
        data{
          attributes{
            title
            description
            slug 
            updatedAt
            createdAt
            categories  {
              data {
                attributes{
                  category
                }
              }
            }
            cover {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            content
          }
        }
      },
        categories {
          data{
            attributes {
              category
            }
          }
        }
    }`, 
    variables:{slug:`${slug}`}})
  let {posts: {data: postsData}, categories: {data: catsData}} = data;
    return {
        props: {
            posts: postsData,
            categories: catsData,
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

  // catData.forEach((cat) => {
  //   for(let id=1; id<=totalPages; id++){
  //     let page = `/categories/${cat.attributes.category}/${id}`
  //     pages.push(page)
  //   }
  // })

  let pageIds=[]

  async function getPages () {
    for (const cat of catData){
      const {data} = await client.query({
        query: qgl`
        query ($cat:String!, $size: Int!) {
          posts (filters:{categories:{category: {eq:$cat}}}, pagination:{pageSize:$size}){
            meta {
              pagination{
                pageCount
              }
            }  
          }
        }
      `, variables: {cat:"music", size:postperpage}
    })
    let {meta: {pagination: {pageCount}}} = data

    for (let i = 1; i<=pageCount; i++){
      pageIds.push(
        {params:{category: `${cat.attributes.category}`, id: `${i}`}}
      )
    }
  }
  }

  return {
    paths: pageIds,
    fallback: false // false or 'blocking'
  };
}

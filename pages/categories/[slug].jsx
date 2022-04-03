import Head from 'next/head'
// import Image from 'next/image'
import Navbar from '../../components/nav'
import Footer from '../../components/footer'
import PostSidebar from '../../components/BlogSidebar'
import PostGrid from '../../components/postgrid'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {SidebarLayout} from '../../components/layouts'
import client from '../../lib/client'

export default function Home({posts, categories}) {
  // posts.forEach(post => console.log(post.attributes.cover.data.attributes.url))
  // posts.forEach(post => console.log(post.attributes.cover))
  // posts.forEach(post => console.log(post))
  return (
    <SidebarLayout categories={categories} >
      <PostGrid posts={posts} />
    </SidebarLayout>
  )
}


  // let {attributes: {title: postTitle, description:postDescription, slug:postSlug, createdAt:postCreated, updatedAt: postUpdated, cover: {data: {attributes: {name:coverName, url:coverUrl}}}}} = post


export const getStaticProps = async ({params}) => {
  let {slug} = params;
  const {data} = await client.query({
    query: gql`
    query ($slug: String!){
      posts (filters: {categories: {category: {eq: $slug}}}) {
        data{
          attributes{
            title
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
  let {categories: {data: catData}}= await data;
  console.log(catData)
  return {
    paths: catData.map((cat) => `/categories/${cat.attributes.category}`),
    fallback: false // false or 'blocking'
  };
}

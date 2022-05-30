import { ProseLayout } from '../../components/layouts'
import PostCard from '../../components/postcard'
import Card from '../../components/card'
import { gql } from '@apollo/client'
import { GET_SOCIALS, POST_LIST } from '../../lib/queries'
import InitClient from '../../lib/client'
import Link from 'next/link'
import Image from 'next/image'


const galleriesHome = ({ socials, posts, galleries }) => {

  ///NEXT: implement below into card to generate gallery cards
  console.log(galleries[0].attributes.images.data[0].attributes.url)
  return (
    <ProseLayout socials={socials} >
      <div className="flex flex-col col-span-full">
        <div className="w-full">
          <h2 className="w-full text-h2 md:text-h1 font-jost py-2 font-semibold ">Me</h2>
          {/* maybe should put an image here */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet ultricies ex. Quisque tempor eu lorem non dignissim. Integer ultrices nibh vel nisl sollicitudin elementum. Curabitur non gravida mauris. In non ullamcorper dolor. Fusce et scelerisque diam, at suscipit sem. Nullam lacus eros, blandit nec hendrerit rhoncus, aliquet nec ipsum. Vivamus ut tortor justo. Aliquam non ante facilisis, eleifend orci non, semper ligula. Curabitur eu odio nec nisi scelerisque interdum in quis orci. Sed id tellus vel velit auctor luctus ac vitae tortor. Integer a elementum dui, id bibendum enim. Donec nec dui nec dui sollicitudin consequat sed non neque. Pellentesque egestas dictum dui id aliquam. Integer vel sodales ipsum. Nullam vitae vulputate neque.
            Praesent pulvinar a felis non lobortis. Morbi efficitur mollis metus id maximus. Etiam ornare sodales tellus, quis posuere augue consequat at. Fusce eget tellus vitae sapien iaculis ultrices. Vivamus in nisi pellentesque, finibus sem sit amet, iaculis urna. Mauris imperdiet enim et aliquet mollis. Aenean consequat leo in urna fermentum consectetur. Integer est sapien, vestibulum eget orci eu, faucibus sodales massa. Ut et nibh non enim lobortis semper. Vestibulum sed auctor erat, non pellentesque urna. Maecenas dapibus, erat vel facilisis mollis, augue enim tincidunt lacus, eget viverra felis justo vel sapien. Phasellus quis dignissim nisl, id consequat elit. Quisque in convallis leo, ut faucibus arcu. Nullam ac diam a lectus tristique feugiat.
          </p>
        </div>
        <div className="w-full">
          <a><Link href={'/blog/1'}><h2 className="w-full text-h2 md:text-h1 font-jost py-2 font-semibold hover:text-orange-400">Blog</h2></Link></a>

          <h3 className="w-full text-h3 md:text-h2 font-jost py-2 font-semibold ">Featured Posts</h3>
          <div className="grid grid-cols-4 md:grid-cols-12 items-stretch" >
            {/* recents */}
            {posts.map(post => <PostCard post={post} key={post.id} />)}
          </div>
          <h3 className="w-full text-h3 md:text-h2 font-jost py-2 font-semibold ">Recent Posts</h3>
          <div className="grid grid-cols-4 md:grid-cols-12 items-stretch" >
            {/* recents */}
            {posts.map(post => <PostCard post={post} key={post.id} />)}
          </div>

        </div>
        <div className="w-full">
          <Link href={'/blog/1'}><a><h2 className="w-full text-h2 md:text-h1 font-jost py-2 font-semibold hover:text-orange-400">Galleries</h2></a></Link>

          <div className="grid grid-cols-4 md:grid-cols-12 items-stretch" >
            {/* recents */}

            {
              galleries.map(gallery => <Card title={gallery.attributes.title} description={gallery.attributes.description} slug={gallery.attributes.slug} />)
            }
          </div>
        </div>

      </div>
    </ProseLayout >
  )
}

export const getStaticProps = async ({ params }) => {
  const client = InitClient();

  const { data: { footer: { data: { attributes: { socials: socialsData } } } } } = await client.query(
    { query: gql(GET_SOCIALS) }
  )

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
      variables: { pageNum: 1, size: 3 }
    }
  )

  const { data: { galleries: { data: galleryData } } } = await client.query(
    {
      query: gql`
    query GALLERY_LIST ($pageNum: Int!, $size: Int!) {
      galleries(pagination:{pageSize:$size, page:$pageNum}, sort:"createdAt:desc"){
          data{ 
            attributes{ 
              title 
              slug
              description
              images (pagination: { start: 0, limit: 100 }){
                data {
                  attributes {
                    url
                    caption
                    alternativeText
                    width
                    height
                    hash
                  }
          }
        }
            } 
          } 
        } 
      } `,
      variables: { pageNum: 1, size: 3 }
    }
  )
  return {
    props: {
      socials: socialsData,
      posts: postsData,
      galleries: galleryData,
    }
  }
}
export default galleriesHome;

import PostCard from './postcard'
const PostGrid = ({posts}) => {
  return (
    <main className=" col-span-4 md:col-span-8 grid grid-cols-4 md:grid-cols-8" >
      {posts.map(post => <PostCard post={post} />)} 
    </main>
  )
}

export default PostGrid;

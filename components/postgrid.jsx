import PostCard from './postcard'
const PostGrid = ({posts}) => {
  return (
    <main className="col-span-5 md:col-span-9 grid grid-cols-4 md:grid-cols-8 items-stretch" >
      {posts.map(post => <PostCard post={post} />)} 
    </main>
  )
}

export default PostGrid;

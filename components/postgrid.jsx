import PostCard from './postcard'
const PostGrid = ({posts, full }) => {

  if (posts == null) {
    return (
      <div>
      fuk
      </div>
    )
  }
  else {
    if (full) {
      return (
        <main className="col-span-8 md:col-span-9 grid grid-cols-8 md:grid-cols-12 items-stretch" >
        {posts.map(post => <PostCard post={post} key={post} />)} 
        </main>
      )
    }
    else {
      return(
        <main className="col-span-8 md:col-span-9 grid grid-cols-4 md:grid-cols-8 items-stretch" >
        {posts.map(post => <PostCard post={post} key={post} />)} 
        </main>
      )
    }
  }
}

export default PostGrid;

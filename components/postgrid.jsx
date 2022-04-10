import PostCard from './postcard'
import Pagination from './pagination'
const PostGrid = ({posts, pagination, full }) => {
  let {pageCount} = pagination
  if (full) {
    return (
      <>
      <main className="col-span-8 md:col-span-9 grid grid-cols-8 md:grid-cols-12 items-stretch" >
      <div>
      {posts.map(post => <PostCard post={post} key={post.title} />)} 
      </div>
      <Pagination pageCount={Number(pageCount)}/>
      </main>
      </>
    )
  }
  else {
    return(
      <>
      <main className="col-span-8 md:col-span-9 grid grid-cols-4 md:grid-cols-8 items-stretch" >
      {posts.map(post => <PostCard post={post} key={post.title} />)} 
      <Pagination pageCount={Number(pageCount)}/>
      </main>
      </>
    )
  }
}

export default PostGrid;

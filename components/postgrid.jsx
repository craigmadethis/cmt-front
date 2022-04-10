import PostCard from './postcard'
import Pagination from './pagination'
const PostGrid = ({posts, pagination, full }) => {
  let {pageCount} = pagination
  console.log(pageCount)
  if (full) {
    return (
      <>
      <main className="col-span-8 md:col-span-9 grid grid-cols-8 md:grid-cols-12 items-stretch" >
      <div>
      {posts.map(post => <PostCard post={post} key={post.id} />)} 
      </div>
      <Pagination pageCount={pageCount}/>
      </main>
      </>
    )
  }
  else {
    return(
      <>
      <main className="col-span-8 md:col-span-9 grid grid-cols-4 md:grid-cols-8 items-stretch" >
      {posts.map(post => <PostCard post={post} key={post.id} />)} 
      <Pagination pageCount={pageCount}/>
      </main>
      </>
    )
  }
}

export default PostGrid;

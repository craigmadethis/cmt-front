const PostCard = ({post}) => {
  let {attributes: {title: postTitle, description:postDescription, slug:postSlug}} = post
  return (
  <div key={postSlug} className="col-span-4">
          <h1 className="text-h2 font-jost py-4">{postTitle}</h1>
          <div className="w-5/6 bg-emerald-400 h-[200px]"> an image </div>
          <p>{postDescription}</p>
        </div>)
}

export default PostCard;

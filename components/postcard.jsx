import Image from "next/image"
import Link from "next/link"
import TruncateMarkup from 'react-truncate-markup'; // recommend
const loader = (src) => {
  return `http://localhost:1337${src}`
}
const PostCard = ({post}) => {
  let {attributes: {title: postTitle, description:postDescription, slug:postSlug, createdAt:postCreated, updatedAt: postUpdated, cover: {data: {attributes: {name:coverName, url:coverUrl}}}}} = post

  const postDate = new Date(postCreated)


  return (
    <div key={postSlug} className="mt-2 mr-4 col-span-4 border-b-4 border-blue-400 flex flex-l flex-col justify-between">
    <div>
      <h1 className="text-h3 md:text-h2 font-jost font-semibold hover:text-blue-400 w-full"><Link href='/posts/[slug]' as={`/posts/${postSlug}`}>{postTitle}</Link></h1>
    </div>
      <div className='relative w-full h-32 md:h-64 mt-2 place-self-center'>
        <Image src={`http://localhost:1337${coverUrl}`} layout='fill' objectFit='cover'/>
      </div>
      {/* <div className="w-5/6 bg-emerald-400 h-[200px]"> an image </div> */}
    <div>
      <div className='w-full content-end font-bitter text-p3 md:text-p2 py-2 md:py-4'>
        <TruncateMarkup lines={6}>
        <div>
          <p>{postDescription}</p>
        </div>
        </TruncateMarkup>
      </div>
      <p className='pt-2 w-full text-right text-p3 font-jost font-bold place-self-end'>{postDate.toLocaleDateString()}</p>
    </div>
    </div>
  )
}

export default PostCard;

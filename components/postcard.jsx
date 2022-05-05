import Image from "next/image"
import Link from "next/link"
import TruncateMarkup from 'react-truncate-markup'; // recommend
import blurLoader from '../lib/blurLoader'


const PostCard = ({post}) => {


  let {attributes: {title: postTitle, description:postDescription, slug:postSlug, created:postCreated, updatedAt: postUpdated,  cover: {data: {attributes: {name:coverName, url:coverUrl}}}}} = post

  const postDate = new Date(postCreated)
  return (
<Link href='/blog/post/[slug]' as={`/blog/post/${postSlug}`} key={postSlug}>
    <a  className="p-4 md:mr-4 mb-2 md:mb-4 col-span-4 border-b-4 border-blue-400 flex flex-col">
    <div key={postSlug}>
      <Link href='/blog/post/[slug]' as={`/blog/post/${postSlug}`}><a><h1 className='h-24 text-h2 font-jost font-semibold hover:text-blue-400 w-full pb-2 '>{postTitle}</h1></a></Link>
    </div>
      <div className='relative w-full aspect-w-4 aspect-h-4 mt-2 place-self-center m-6 max-h-[70vh] '>
        <Image src={`${coverUrl}`} layout='fill' objectFit='cover' priority='true' sizes='50vw' placeholder='blur' blurDataURL={blurLoader(coverUrl)}/>
      </div>
      {/* <div className="w-5/6 bg-emerald-400 h-[200px]"> an image </div> */}
    <div>
      <div className='w-full font-bitter text-p2 pt-2 md:pt-4 h-32 '>
        <TruncateMarkup lines={6} >
        <div >
          <p>{postDescription}</p>
        </div>
        </TruncateMarkup>
      </div>
    <Link href='/blog/post/[slug]' as={`/blog/post/${postSlug}`}><a><p className='w-full pt-2 font-jost font-semibold text-right hover:text-blue-400 justify-end flex-auto'>Read more {'>'}</p></a></Link>
      <p className='pt-2 w-full text-left text-p2 font-jost font-bold justify-end'>{postDate.toLocaleDateString()}</p>
    </div>
    </a></Link>
  )
}

export default PostCard;

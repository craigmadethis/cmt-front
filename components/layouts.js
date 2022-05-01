import Navbar from './nav'
import Footer from './footer'
import PostSidebar from './BlogSidebar'
import {LightgalleryItem} from "react-lightgallery"
import Image from 'next/image'
import Link from 'next/link'

export const SidebarLayout = (props) => {
 return( 
   <div className='bg-gray-50  flex flex-col h-full min-h-screen justify-between'>
    <Navbar />
    <div className="w-full px-4 mb-auto md:px-0 md:w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6  justify-between ">
    {props.children}
    <PostSidebar categories={props.categories} />
  </div>
  <Footer socials={props.socials}/>
  </div>
 )
}

export const ProseLayout = (props) => {

  return (
	<div className='bg-gray-50 min-h-screen flex flex-col min-h-screen justify-between'>
    <Navbar />

    <div className="w-full px-2 md:px-0 md:w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6 mb-auto ">
    <div className="col-span-12 grid grid-cols-8 border-b-2 border-gray-200">
    {props.children}


    </div>
    </div>
    <Footer socials={props.socials}/>
    </div>

  )
}

export const GalleryLayout = (props) => {


  let {attributes: {images: {data: allImages}, title, description}} = props.gallery
  return (
	<div className='bg-gray-50 min-h-screen flex flex-col min-h-screen justify-between'>
    <Navbar />

    <div className="w-full px-4 md:px-0 mx-auto grid grid-cols-8 md:grid-cols-12 my-6 mb-auto border-b-2 border-gray-400">

    <div className='col-span-full mb-2'>
    <h1 className='text-center text-h1 font-jost font-semibold text-orange-400 pb-2'> {title}</h1>
    <p className='text-center md:text-p2 font-bitter pb-6 md:w-3/6 md:mx-auto'> {description}</p>

    <div className='flex flex-col md:flex-row md:flex-wrap justify-center items-center'>
    {allImages.map(({attributes: {url, caption, width, height, alternativeText: alt}}) => 
      <Link href='' key={url}>
      <a>
          <LightgalleryItem src={url} group="page" subHtml={caption} className='aspect-square p-2' >
      {/* <img className="object-contain max-h-[50vh] md:max-h-[40vh] p-1" src={`${url}`} alt={alt}/> */}
      <div className='h-[40vh] aspect-square m-1 hover:opacity-75 relative'>
      <Image className="" src={`${url}`} alt={`${alt}`} layout="fill" width={`${width}`} height={`${height}`} sizes="80vw" objectFit='cover'/>
      </div>
      </LightgalleryItem>
      </a>
      </Link>
    )

    }
    </div>




          {/* <div className='masonry-1-col md:masonry-2-col'> */}
    {/* {allImages.map(({attributes: {url, caption, alternativeText: alt}}) => */} 
          {/*   <div className='mx-auto w-full my-4 aspect-[4/3] relative break-inside-avoid ' key={url}> */}
          {/*     <LightgalleryItem src={`${url}`} group="page" subHtml={caption}> */}
      {/* <a> */}
          {/*         <Image className="img-responsive" src={`${url}`} alt={alt} layout='fill' objectFit='contain'  quality='50' /> */}
      {/* </a> */}
          {/*         {/1* <img src={`http://localhost:1337${url}`} alt={alt} /> *1/} */}
          {/*     </LightgalleryItem> */}
          {/*   </div> */}
      {/* ) */}
    {/* } */}
          {/* </div> */}




    </div>


    </div>
    <Footer socials={props.socials}/>
    </div>

  )}

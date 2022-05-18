import Image from 'next/image'
import {LightgalleryItem} from "react-lightgallery"
import blurLoader from "../lib/blurLoader"
import Link from "next/link"

export default {
    img: (image) =>{ 
      if(image.title) { 
        return (
          <div>
          <div className='mx-auto w-full md:w-5/6 max-w-6xl aspect-[4/3] relative '>
          <LightgalleryItem src={image.src} group="page">
          <a className='' href="">
          <Image className="img-responsive" src={image.src} alt={image.alt} layout='fill' objectFit='contain'  quality='100' sizes="50vw" blurDataURL={blurLoader(image.src)}/>
          </a>
          </LightgalleryItem>
          </div>
          <p className='w-4/6 text-center'>
          {image.title}
          </p>
          </div>
        ) 
      }
      else {
        return (
          <div>
          <div className='mx-auto w-full md:w-5/6 max-w-6xl aspect-[4/3] relative '>
          <LightgalleryItem src={image.src} group="page">
          <a className='' href=''>
          <Image className="img-responsive" src={image.src} alt={image.alt} layout='fill' objectFit='contain'  quality='100' sizes='50vw' blurDataURL={blurLoader(image.src)}/>
          </a>
          </LightgalleryItem>
          </div>
          </div>
        )}
    },
  a: (link)=> {
    return (
      <Link href={link.href}><a>{link.children[0]}</a></Link>
    )
  }
  
  }


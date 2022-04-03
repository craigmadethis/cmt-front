import {gql} from '@apollo/client'
import {ProseLayout} from '../../components/layouts'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'
import client from "../../lib/client"
import { POST_BY_SLUG, POST_SLUGS} from '../../lib/queries'

const Me = (props) => {

  return (

    <ProseLayout>
    <div className='md col-span-8'>
    <h1 className='text-center'> hi im craig and I make things</h1>
    <p> my name is craig and Im a photographer / videographer / retoucher / programmer / designer / physicist </p>

    <p> Im not the chattiest person so Im just going to leave some links to some interesting things below.</p>
    <p> On the photo page youll find some of my favourite photos of the moment. On the blog page, youll find out what Ive been up to including photoshoots and how I made things. </p>
    <p>I like doing things the hard way so unlearnt my python skills and dove head first into react and nextjs to built this site. You can read how I designed the site in Figma here and how I built the site using nextjs, strapi and tailwindcss here </p>
    <p>If youre interested in physics you can read my third, fourth and fifth year reports: 
    <ul>
    <li>Construction of a </li>
    <li>The Higgs mechanism and naturalness</li>
    <li>Construction of a </li>
    </ul></p>

    </div>
    </ProseLayout>
  )
}

export default Me;

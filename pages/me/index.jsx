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
    <p>wowow</p>

    </div>
    </ProseLayout>
  )
}

export default Me;

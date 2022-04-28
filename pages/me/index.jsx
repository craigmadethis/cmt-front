import {gql} from '@apollo/client'
import {ProseLayout} from '../../components/layouts'
import { GET_SOCIALS, GET_ME_DATA} from '../../lib/queries'
import InitClient from '../../lib/client'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

const Me = ({socials, me}) => {

  return (

    <ProseLayout socials={socials}>
    <div className='markdown col-span-8 min-h-fit'>
    <h1 className='w-full md:w-2/3 text-center px-2 py-2'>{me.attributes.title}</h1>
    <div className='flex flex-col md:flex-row w-full'>
      
      <div className='markdown w-full md:w-2/3 '>
      <ReactMarkdown transformImageUri={uri => uri.startsWith("http") ? uri : `${uri}` }  >
      {me.attributes.about}
      </ReactMarkdown>
      </div>
      <div className='w-full md:w-1/3 h-96 max-h-fit md:max-h-fit relative my-12'>
        <Image src={me.attributes.avatar.data.attributes.url} layout='fill' objectFit='contain' />   
      </div>
    </div>

    </div>
    </ProseLayout>
  )
}

export const getStaticProps = async ({params}) => {
  const client = InitClient()

  const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )

  const {data: {mePage: {data:meData}}} = await client.query(
    {
    query: gql(GET_ME_DATA)
    }
  )

    return {
        props: {
          socials: socialsData,
          me: meData,
        }
    }
}

export default Me;

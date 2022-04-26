import {gql} from '@apollo/client'
import {ProseLayout} from '../../components/layouts'
import ReactMarkdown from 'react-markdown'
import {GET_SOCIALS, GET_LINK_PAGE} from '../../lib/queries'
import InitClient from '../../lib/client'
import Link from 'next/link'

const Links = ({socials, links}) => {

  // const {attributes: {content: cvContent, description: cvDescription}} = cvData
  
  return (
    
    <div>
    
    <ProseLayout socials={socials}>
    <div className='col-span-full'>
    <h1 className='text-center font-jost font-semibold text-h1 text-orange-400'>Links</h1>
    <div className='w-5/6 mx-auto my-4'>
    {links.map((link) => <Link key={link.title} href={link.url} className=''><a><div className='p-2 mb-2 rounded-lg text-center font-jost font-semibold border-2 border-orange-400 w-5/6 mx-auto hover:border-blue-400 text-blue-400 hover:text-orange-400 text-p1'key={link.title}>{link.title}</div></a></Link>)}
    </div>
    </div>
    </ProseLayout>
    </div>
  )
}

export default Links;

export const getStaticProps = async () => {
  const client = InitClient()

  const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )

  const {data: {linkPage: {data: {attributes: {links: linkArray}}}}} = await client.query({query: gql(GET_LINK_PAGE)})

  return {
    props: {
      socials: socialsData,
      links: linkArray
    }
  }
}

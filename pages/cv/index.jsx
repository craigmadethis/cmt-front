import {gql} from '@apollo/client'
import {ProseLayout} from '../../components/layouts'
import ReactMarkdown from 'react-markdown'
import {GET_SOCIALS} from '../../lib/queries'
import InitClient from '../../lib/client'

const CV = ({cvData, socials}) => {

  const {attributes: {content: cvContent, description: cvDescription}} = cvData
  
  return (
    <ProseLayout socials={socials}>
    <div className='col-span-8 md:col-span-6 md:col-start-2'>
    <h1 className ="text-center mb-2 py-4 col-span-8 mx-auto text-d3 md:text-d2 font-semibold font-jost leading-normal text-blue-400">CV</h1>
    <div className="text-center font-bitter text-gray-900 text-p3 md:text-p2 leading-normal w-5/6  mx-auto py-4">{cvDescription}</div>
    <div className="md my-4">
      <ReactMarkdown transformImageUri={uri => uri.startsWith("http") ? uri : `${uri}` }>
    {cvContent}
    </ReactMarkdown>
    </div>
    </div>
    
    </ProseLayout>
  )
}

export default CV;

export const getStaticProps = async () => {
  const client = InitClient()

  const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )

  
  const {data: {cv: {data:cvData}}} = await client.query(
    {
      query: gql`
      query { 
        cv{
          data{
            attributes{
              description 
              content
            }
          }
        }
      }
      `
    }
  )
  console.log(cvData)

  return {
    props: {
      cvData: cvData,
      socials: socialsData
    }
  }
}

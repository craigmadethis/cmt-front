import {gql} from '@apollo/client'
import {ProseLayout} from '../../components/layouts'
import ReactMarkdown from 'react-markdown'
import {GET_SOCIALS} from '../../lib/queries'
import InitClient from '../../lib/client'

const CV = () => {

  // const {attributes: {content: cvContent, description: cvDescription}} = cvData
  
  return (
    
    <div>
    hi
    </div>
  )
}

export default CV;

// export const getStaticProps = async () => {
//   const client = InitClient()

//   const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
//     {query: gql(GET_SOCIALS)}
//   )

//   const {data: {cvs: {data:cvData}}} = await client.query(
//     {
//       query: gql`
//       query { 
//         cv{
//           data{
//             attributes{
//               description 
//               content
//             }
//           }
//         }
//       }
//       `
//     }
//   )

//   return {
//     props: {
//       cvData: cvData[0],
//       socials: socialsData
//     }
//   }
// }

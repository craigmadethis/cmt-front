import {gql} from '@apollo/client'
import {ProseLayout} from '../../components/layouts'
import { GET_SOCIALS} from '../../lib/queries'
import InitClient from '../../lib/client'

const Me = ({socials}) => {

  return (

    <ProseLayout socials={socials}>
    <div className='md col-span-8'>
    <h1 className='text-center'> hi im craig and I make things</h1>
    <p>wowow</p>

    </div>
    </ProseLayout>
  )
}

export const getStaticProps = async ({params}) => {
  const client = InitClient()

  const {data:{footer: {data: {attributes: {socials: socialsData}} }}} = await client.query(
    {query: gql(GET_SOCIALS)}
  )

    return {
        props: {
          socials: socialsData,
        }
    }
}

export default Me;

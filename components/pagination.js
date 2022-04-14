import {useRouter} from 'next/router'

const Pagination = ({pageCount}) => {
  const router = useRouter()
  const pageNum = Number(router.query.id)
  const category = router.query.category || null
  const NextButton = ({routerquery}) =>(
      <button
      type="button"
      className='font-semibold hover:text-blue-400'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: routerquery.next,
        })
      }}
      >
      {'>'}
      </button>
  )

  const PrevButton = ({routerquery}) => (
      <button
      type="button"
      className='font-semibold hover:text-blue-400'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: routerquery.prev,
        })
      }}
      >
      {'<'}
      </button>
  )


  const routerquery = category ? ({
    next :{
      id:Number(router.query.id)+1,
      category:null||router.query.category 
    },
    prev: {
      id:Number(router.query.id)-1,
      category:null||router.query.category 
    }
  })
    :( {
      next :{
        id:Number(router.query.id)+1,
      },
      prev: {
        id:Number(router.query.id)-1,
      }
    })

  return (
    <div className='col-span-full flex text-p1 md:text-h3 font-jost font-semibold w-full my-6'>

    <div className='w-full text-center '>
      {(pageNum >=2 && pageNum < pageCount) && (
        <>
        <PrevButton routerquery={routerquery}/>
        <span> {pageNum} </span>
        <NextButton routerquery={routerquery}/>
        </>
      ) }


      {(pageNum ==1  && pageCount > 1) && (
        <>
        <span> {pageNum} </span>
        <NextButton routerquery={routerquery}/>
        </>
      )
      }

      {(pageCount != 1 && pageNum == pageCount)  && (
        <>
        <PrevButton routerquery={routerquery}/>
        <span> {pageNum} </span>
        </> 
      )
      }
      </div>
    </div>
  )
}
export default Pagination 

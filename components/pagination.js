import {useRouter} from 'next/router'

const Pagination = ({pageCount}) => {
  const router = useRouter()
  const pageNum = Number(router.query.id)
  const category = router.query.category || null
  
  
  if (category != null) {
  return (
    <>
    {(pageNum >=2 && pageNum < pageCount) && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full my-6'>
      <div className='w-1/2 text-left hover:text-blue-400 '>

      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: { category:null||router.query.category, id:Number(router.query.id)-1 },
        })
      }}
      >
      {'< prev'}
      </button>
      </div> 
      <div className='w-1/2 text-right hover:text-blue-400 '>

      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: { category:null||router.query.category, id:Number(router.query.id)+1 },
        })
      }}
      >
      {'next >'}
      </button>

      </div>
    </div>
    )
    }
    {(pageNum ==1  && pageCount > 1) && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full my-6'>
      <div className='w-full text-right hover:text-blue-400 '>
      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: { category: null||router.query.category, id:Number(router.query.id)+1 },
        })
      }}
      >
      {'next >'}
      </button>
      </div>
    </div>
    )
    }
    {(pageCount != 1 && pageNum == pageCount)  && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full my-6'>
      <div className='w-full text-left hover:text-blue-400 '>
      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: { category:router.query.category, id:Number(router.query.id)-1 },
        })
      }}
      >
      {'< prev'}
      </button>
      </div> 
    </div>
    )
    }
    </>
  )

  }
  else {

  return (
    <>
    {(pageNum >=2 && pageNum < pageCount) && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full my-6'>
      <div className='w-1/2 text-left hover:text-blue-400 '>

      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: {id:Number(router.query.id)-1 },
        })
      }}
      >
      {'< prev'}
      </button>
      </div> 
      <div className='w-1/2 text-right hover:text-blue-400 '>

      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: {id:Number(router.query.id)+1 },
        })
      }}
      >
      {'next >'}
      </button>

      </div>
    </div>
    )
    }
    {(pageNum ==1  && pageCount > 1) && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full my-6'>
      <div className='w-full text-right hover:text-blue-400 '>
      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: {id:Number(router.query.id)+1 },
        })
      }}
      >
      {'next >'}
      </button>
      </div>
    </div>
    )
    }
    {(pageCount != 1 && pageNum == pageCount)  && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full my-6'>
      <div className='w-full text-left hover:text-blue-400 '>
      <button
      type="button"
      className='font-jost font-semibold text-p1'
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: {id:Number(router.query.id)-1 },
        })
      }}
      >
      {'< prev'}
      </button>
      </div> 
    </div>
    )
    }
    </>
  )
  }
}
export default Pagination;

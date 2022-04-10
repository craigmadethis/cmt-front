import {useRouter} from 'next/router'
import Link from 'next/link'

const Pagination = ({pageCount}) => {
  const router = useRouter()
  const pageNum = Number(router.query.id)
  return (
    <>
    {(pageNum >=2 && pageNum < pageCount) && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full mt-6'>
      <div className='w-1/2 text-left hover:text-blue-400 '>
      <Link href={`${pageNum-1}`}>
      <a>
      <a>{'<'}</a>
      </a> 
      </Link>
      </div> 
      <div className='w-1/2 text-right hover:text-blue-400 '>
      <Link href={`${pageNum +1}`}>
      <a>{'>'} </a> 
      </Link>
      </div>
    </div>
    )
    }
    {(pageNum ==1  && pageCount > 1) && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full mt-6'>
      <div className='w-full text-right hover:text-blue-400 '>
      <Link href={`${pageNum +1}`}>
      <a>{'>'} </a> 
      </Link>
      </div>
    </div>
    )
    }
    {(pageCount != 1 && pageNum == pageCount)  && (
    <div className='col-span-full flex text-h3 md:text-h2 font-jost font-semibold w-full mt-6'>
      <div className='w-full text-left hover:text-blue-400 '>
      <Link href={`${pageNum -1}`}>
      <a>{'<'}</a>
      </Link>
      </div> 
    </div>
    )
    }
    </>
  )
}
export default Pagination;

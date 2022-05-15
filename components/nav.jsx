import Link from 'next/link'
function Navbar() {
  return (
	  <nav className='flex w-full px-4 md:px-0 md:w-5/6 mx-auto pt-6 pb-4 items-center border-b-gray-200 border-b-2 justify-between'>
    <div className="sm:w-1/3">
    <div className="flex flex-col text-h2 font-semibold font-jost">
    <ul>
    <li className="hover:text-orange-400" ><Link href='/photo'>photo</Link></li>
    <li className="hover:text-orange-400"> <Link className="hover:text-orange-400" href='/blog/1'>blog</Link></li>
    <li className="hover:text-orange-400"> <Link className="hover:text-orange-400" href='/me'>me</Link></li>
    </ul>
    </div>
    </div>
    <div>
    <Link href='/' as={'/'} >
    <a >
	  <div className='text-d3 md:text-d2 font-bold font-jost whitespace-pre-wrap text-right hover:text-emerald-400'>
		  <p >@CRAIG</p>
		  <p >
		  MADE
		  </p>
		  <p >
		  THIS
		  </p>
	  </div>
    </a>
    </Link>
    </div>
    </nav>
  )
}

export default Navbar

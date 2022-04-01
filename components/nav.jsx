import Link from 'next/link'
function Navbar() {
  return (
	  <nav className='flex w-full px-4 md:px-0 md:w-5/6 mx-auto pt-6 pb-4 items-center border-b-gray-200 border-b-2 justify-between'>
    <div className="sm:w-1/3">
    <div className="flex flex-col text-h2 font-semibold font-jost">
    <h1 className="hover:text-orange-400" ><Link href='/blog/1'>photo</Link></h1>
    <h1 className="hover:text-orange-400"> <Link className="hover:text-orange-400" href='/blog/1'>blog</Link></h1>
    <h1 className="hover:text-orange-400"> <Link className="hover:text-orange-400" href='/blog/1'>me</Link></h1>
    </div>
    </div>
	  <div className='text-d3 md:text-d2 font-bold font-jost whitespace-pre-wrap text-right w-2/3 hover:text-emerald-400 '>
		  <h1>@CRAIG</h1>
		  <h1>
		  MADE
		  </h1>
		  <h1>
		  THIS
		  </h1>
	  </div>
    </nav>
  )
}

export default Navbar

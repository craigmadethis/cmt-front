import Link from 'next/link'
function Navbar() {
  return (
	  <nav className='flex w-5/6 mx-auto pt-6 pb-4 items-center border-b-gray-200 border-b-2'>
    <div className="sm:w-1/3">
    <div className="flex flex-col text-h2 font-semibold font-jost">
    <a className=" hover:text-orange-400">photo</a>
    <a className="hover:text-orange-400">blog</a>
    <a className="hover:text-orange-400">contact</a>
    </div>
    </div>
	  <div className='text-d2 font-bold font-jost whitespace-pre-wrap text-right w-2/3 hover:text-emerald-400 '>
		  <h1> @CRAIG </h1>
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

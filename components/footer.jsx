import Link from 'next/link'
const Footer = ({socials}) => {



  return (
    <footer className=" bg-gray-900 text-gray-50 md:flex flex-row md:flex-col font-bitter">
    <p className="md:w-1/2 mx-auto text-center text-h3 font-jost font-semibold py-6 ">@CRAIGMADETHIS</p>
    
    <div className='md:w-1/2 mx-auto md:flex md:justify-around'>

    <div className='md:w-1/2 text-center md:text-left mx-4 mb-4 md:mb-0 text-p2'>
    <h2 className='pb-4 font-jost font-semibold text-p1'>Site:</h2>
    <ul>
    <li className='hover:text-blue-400 pb-4 '><Link href='/blog' as='/blog'><a>blog</a></Link></li>
    <li className='hover:text-blue-400 pb-4 '><Link href='/me' as='/me'><a>me</a></Link></li>
    <li className='hover:text-blue-400 pb-4 '><Link href='/photo' as='/photo'><a>photography</a></Link></li>
    <li className='hover:text-blue-400 pb-4 '><Link href='/links' as='/links'><a>links</a></Link></li>
    </ul>

    </div>


    {socials ? (
    <div className=' text-center md:text-right mx-4 text-p2'>
    <h2 className = 'pb-4 font-jost font-semibold text-p1'> Follow me: </h2>
    <ul>
    {socials.map(social => <Link href={social.url} as={social.url} key={social.title}><a><li className='hover:text-blue-400 pb-4'  >{social.title}</li></a></Link>)}
    </ul>

    </div>
    ): null}


    </div>
    <p className="md:w-1/2 mx-auto text-center text-p3 font-jost font-semibold py-6">© Craig Shewry 2022</p>
    </footer>

  )
}

export default Footer;

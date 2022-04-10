import Link from 'next/link'
const Footer = () => {
  const socials = [
    {
      key: '1',
      name: 'instagram',
      url: 'http://instagram.com/craigmadethis'
    },
    {
      key: '2',
        name: 'twitter',
        url: 'http://twitter.com/craigmadethis'
    },
    {
      key: '3',
        name: 'facebook',
        url: 'http://facebook.com/craigmadethis'
    },
    {
      key:'4',
      name:'email',
      url:'mailto:craigshewry@gmail.com'
    }

  ]

  return (
    <footer className=" bg-gray-900 text-gray-50 md:flex flex-row md:flex-col font-bitter">
    <h1 className="md:w-1/2 mx-auto text-center text-h3 font-jost font-semibold py-6 ">@CRAIGMADETHIS</h1>
    
    <div className='md:w-1/2 mx-auto md:flex md:justify-around'>

    <div className='md:w-1/2 text-center md:text-left mx-4 mb-4 md:mb-0'>
    <h1 className='pb-2 font-jost font-semibold'>Site:</h1>
    <ul >
    <li className='hover:text-blue-400'><Link href='/blog' as='/blog'><a>blog</a></Link></li>
    <li className='hover:text-blue-400'><Link href='/me' as='/me'><a>me</a></Link></li>
    <li className='hover:text-blue-400'><Link href='/photo' as='/photo'><a>photography</a></Link></li>
    <li className='hover:text-blue-400'><Link href='/links' as='/links'><a>links</a></Link></li>
    </ul>

    </div>


    <div className=' text-center md:text-right mx-4'>
    <h1 className = 'pb-2 font-jost font-semibold'> Follow me: </h1>
    <ul>
    {socials.map(social => <Link href={social.url} as={social.url} key={social.key}><a><li className='hover:text-blue-400'  >{social.name}</li></a></Link>)}
    </ul>
    </div>


    </div>
    <h1 className="md:w-1/2 mx-auto text-center text-p3 font-jost font-semibold py-6">© Craig Shewry 2022</h1>
    </footer>

  )
}

export default Footer;

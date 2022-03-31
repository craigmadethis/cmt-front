import Navbar from './nav'
import Footer from './footer'
import PostSidebar from './BlogSidebar'

export const SidebarLayout = (props) => {
 return( 
   <div className='bg-gray-50 min-h-screen flex flex-col h-screen justify-between'>
    <Navbar />
    <div className="w-full px-4 mb-auto md:px-0 md:w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6  justify-between ">
    {props.children}
    <PostSidebar categories={props.categories} />
  </div>
  <Footer />
  </div>
 )
}

export const ProseLayout = (props) => {

  return (
	<div className='bg-gray-50 min-h-screen'>
    <Navbar />

    <div className="w-full px-2 md:px-0 md:w-5/6 mx-auto grid grid-cols-8 md:grid-cols-12 mt-6 ">
    <div className="col-span-12 grid grid-cols-8 border-b-2 border-gray-400">
    {props.children}


    </div>
    </div>
    <Footer/>
    </div>

  )
}

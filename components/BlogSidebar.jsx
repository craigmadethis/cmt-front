import Link from 'next/link'
const PostSidebar = ( {categories} ) => {
  let cats = categories.map(cat => cat.attributes)
  return (
      <div id='sidebar' className="hidden md:inline md:col-span-3 ">
      <div className="flex-col w-full justify-end text-right">
        <h1 className="w-full text-right text-h2 md:text-h1 font-jost py-2 font-semibold ">Lost?</h1>
      <ul className="text-p2 md:text-p1 font-bitter">
      {cats.map(cat => <li className='hover:text-blue-400' key={cat.category}><Link href='/categories/[slug]' as={`/categories/${cat.category}`}>{cat.category}</Link></li>)}
      </ul>
      </div>
      </div>
  )
}

export default PostSidebar;

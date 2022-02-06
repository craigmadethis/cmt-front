const PostSidebar = ( {categories} ) => {
  let cats = categories.map(cat => cat.attributes)
  return (
      <sidebar className="col-span-4">
      <div className="flex-col w-full justify-end text-right">
        <h1 className="w-full text-right text-h1 font-jost py-2 ">Lost?</h1>
      <ul className="text-p1 font-bitter">
      {cats.map(cat => <li key={cat.category}>{cat.category}</li>)}
      </ul>
      </div>
      </sidebar>
  )
}

export default PostSidebar;

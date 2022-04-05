
export const getStrapiURL= (path="") => {
  const newrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
  console.log(newrl)
  return newrl 
}

export function getStrapiMedia(url){
  // if url exists AND starts with slash, get strapi else just url 
  const imageUrl = url && url.startsWith("/") ? getStrapiURL(url): url;
  return imageUrl;
}


export const getStrapiURL= (path="") => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

export function getStrapiMedia(url){
  // if url exists AND starts with slash, get strapi else just url 
  const imageUrl = url && url.startsWith("/") ? getStrapiURL(url): url;
  return imageUrl;
}

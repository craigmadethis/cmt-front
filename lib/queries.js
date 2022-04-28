export const POST_BY_SLUG = `
query POST_BY_SLUG ($slug: String!){
  posts(filters: {slug: {eq: $slug}}){
data {
      attributes {
        title
        content
        created
        createdAt
        description
        gallery {
          data {
            attributes {
              title
              slug
            }
          }
        }
      }
    }
  }
    categories {
      data {
        attributes {
          category
        }
      }
    },
}`

export const POST_SLUGS = `
query POST_SLUGS{
  posts{
    data{
      attributes{
        slug
      }
    }
  } 
}`


export const POST_LIST = `
    query POST_LIST ($pageNum: Int!, $size: Int!) {
      posts(pagination:{pageSize:$size, page:$pageNum}, sort:"created:desc"){
        meta {
          pagination {
            pageCount
          }
        }
        data{
          attributes{
            title
            description
            slug
            created
            createdAt
            updatedAt
            cover {
              data {
                attributes {
                  name
                  url
                }
              }
            }
          }
        }
      }, 
        categories {
          data {
            attributes{
              category
            }
          }
        }
    }`

export const PAGE_DATA = `
query ($size: Int!){
  posts (pagination: {pageSize:$size}){
    meta {
      pagination {
        total
        pageCount
      }
    }
  }
}
`

export const GET_GALLERY_IMAGES = `
query GET_PORTFOLIO ($slug: String!){
  galleries (filters: {slug:{eq: $slug}}) {
    data {
      attributes {
        title
        description
        slug
        images {
          data {
            attributes {
              url
              caption
              alternativeText
              width
              height
            }
          }
        }
      }
    }
  }
}`



export const POSTS_BY_CAT = `
query ($size: Int!, $pageNum: Int!, $cat: String!){
  posts (pagination:{pageSize:$size, page:$pageNum}, filters: {categories: {category: {eq: $cat}}}) {
    meta {
      pagination {
        pageCount
      }
    }
    data{
      attributes{
        title
        description
        slug 
        updatedAt
        createdAt
        created
        categories  {
          data {
            attributes{
              category
            }
          }
        }
        cover {
          data {
            attributes {
              name
              url
            }
          }
        }
        content
      }
    }
  },
    categories {
      data{
        attributes {
          category
        }
      }
    }
}`

export const GET_SOCIALS = `
query{
  footer {
    data{
      attributes{
        socials{
          title
          url
        }
      }
    }
  }
}`

export const GET_GALLERY_SLUGS = `
query{
  galleries{
    data{
      attributes{
        slug
      }
    }
  }
}`

export const GET_CATEGORIES = `
    query {
      categories{
        data{
          attributes{
            category
          }
        }
      } 
    }
`

export const GET_ME_DATA = `
query{
  mePage{
    data{
      attributes{
        title
        about
        avatar {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`

export const GET_LINK_PAGE = `
  query{
    linkPage {
      data {
        attributes {
          links {
            title
            url
          }
        }
      }
    }
  }
`

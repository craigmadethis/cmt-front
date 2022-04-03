export const POST_BY_SLUG = `
query POST_BY_SLUG ($slug: String!){
  posts(filters: {slug: {eq: $slug}}){
    data{
      attributes{
        title
        content
        createdAt
        description
        galleries {
          data {
            attributes {
              images {
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
    }
  },
    categories {
      data {
        attributes {
          category
        }
      }
    }
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
      posts(pagination:{pageSize:$size, page:$pageNum}, sort:"createdAt"){
        data{
          attributes{
            title
            description
            slug
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
            }
          }
        }
      }
    }
  }
}`

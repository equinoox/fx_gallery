import { graphql } from "graphql";
import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// END POINT 1
export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              exerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `

    const results = await request(graphqlAPI, query)

    return results.postsConnection.edges;
};


// END POINT 2
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        exerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};


// export const getPostDetails = async (slug) => {
//   const query = gql`
//   query GetPostDetails($slug: String!) {
//     post(where: { slug: $slug }) {  
//         author {
//           bio
//           name
//           id
//           photo {
//             url
//           }
//         }
//         createdAt
//         slug
//         title
//         exerpt
//         featuredImage {
//           url
//         }
//         categories {
//           name
//           slug
//         }
//         content {
//           raw
//         }
//       }
//     }
//   `;

//   const results = await request(graphqlAPI, query, { slug } )

//   return results.post;
// };


// END POINT 3
export const getRecentPosts = async () => {
  const query = gql`
    query getPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
    }
  `
  const results = await request(graphqlAPI, query)

  return results.posts;
}


// END POINT 4 
export const getSimilarPosts = async ( categories, slug ) => {
  const query = gql `
    query getPostDetails($slug: String!, $caregories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: {categories_some: { slug_in: $caregories}}}
        last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
    }
  `
  const results = await request(graphqlAPI, query, { categories, slug })

  return results.posts;
}


// END POINT 5
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const results = await request(graphqlAPI, query)

  return results.categories;
}

// END POINT 6
// MY BACKEND

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  } )

  return result.json();
}

// END POINT 7
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug:$slug} } ) {
        name
        createdAt
        comment
      }
    
    }
  `
  const results = await request(graphqlAPI, query, {slug})

  return results.comments;
}


// END POINT 8
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            exerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};
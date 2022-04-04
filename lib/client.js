import {ApolloClient, InMemoryCache} from '@apollo/client'

const InitClient = () => new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
  // uri: 'https://cmt-back.herokuapp.com/graphql',
    cache: new InMemoryCache(),
    });



export default InitClient;




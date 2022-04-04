import {ApolloClient, InMemoryCache} from '@apollo/client'

const InitClient = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
    // uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
    });



export default InitClient;




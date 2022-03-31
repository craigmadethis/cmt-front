import {ApolloClient, InMemoryCache, gql} from '@apollo/client'

export default function InitClient () {
    return new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache(),
    });
}

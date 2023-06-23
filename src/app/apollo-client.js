import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,

          // This effectively disables cache :(
          merge(existing = [], incoming) {
            return incoming;
          },
        }
      },
    },
  },
});

const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: cache,
});

export default client;

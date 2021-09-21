import client from "./client";
import { ApolloProvider, Query } from "react-apollo";
import { SEARCH_REPOSITORIES } from "./graphql";
import { useState } from "react";

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

const App = () => {
  const [variables, setVariables] = useState(VARIABLES)

  const {first, after, last, before, query,} = variables
  return (
    <ApolloProvider client={client}>
      <Query query={SEARCH_REPOSITORIES} variables={{first, after, last, before, query,}} >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log(data);
          return <div>{}</div>;
        }}
      </Query>
      <div className="App">
        <div>Hello</div>
      </div>
    </ApolloProvider>
  );
};

export default App;

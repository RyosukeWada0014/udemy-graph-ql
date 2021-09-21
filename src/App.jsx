/* eslint-disable react/jsx-no-target-blank */
import client from "./client";
import { ApolloProvider, Query } from "react-apollo";
import { SEARCH_REPOSITORIES } from "./graphql";
import { useState } from "react";

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

const App = () => {
  const [variables, setVariables] = useState(DEFAULT_STATE);
  const { first, after, last, before, query } = variables;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setVariables({ ...variables, query: e.target.value });
  };

  console.log(query);
  return (
    <ApolloProvider client={client}>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={handleChange} />
      </form>
      <Query
        query={SEARCH_REPOSITORIES}
        variables={{ first, after, last, before, query }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const search = data.search;
          const repositoryCount = search.repositoryCount;
          const repositoryUnit =
            repositoryCount === 1 ? "Repository" : "Repositories";
          const title = `GitHub Repositories Search Results - ${repositoryCount} ${repositoryUnit}`;
          return (
            <>
              <h2>{title}</h2>;
              <ul>
                {search.edges.map((edge) => {
                  console.log(edge);
                  const node = edge.node;
                  return (
                    <li key={node.id}>
                      <a href={node.url}  target="_blank" >
                        {node.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;

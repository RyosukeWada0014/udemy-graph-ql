/* eslint-disable react/jsx-no-target-blank */
import client from "./client";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import { SEARCH_REPOSITORIES, ADD_STAR, REMOVE_STAR } from "./graphql";
import { useState } from "react";
import { StarButton } from "./StarButton";

const PER_PAGE = 5;

const DEFAULT_STATE = {
  first: PER_PAGE,
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

  const goPrevious = (search) => {
    setVariables({
      ...variables,
      first: null,
      after: null,
      last: PER_PAGE,
      before: search.pageInfo.startCursor,
    });
  };

  const goNext = (search) => {
    setVariables({
      ...variables,
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null,
    });
  };

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
                  const node = edge.node;
                  const viewerHasStarred = node.viewerHasStarred;
                  return (
                    <li key={node.id}>
                      <a
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {node.name}
                      </a>
                      &nbsp;
                      <Mutation
                        mutation={viewerHasStarred ? REMOVE_STAR : ADD_STAR}
                      >
                        {(addOrRemoveStar) => (
                          <StarButton
                            node={node}
                            addOrRemoveStar={addOrRemoveStar}
                            viewerHasStarred={viewerHasStarred}
                            {...{ first, after, last, before, query }}
                          />
                        )}
                      </Mutation>
                    </li>
                  );
                })}
              </ul>
              {search.pageInfo.hasPreviousPage === true ? (
                <button onClick={() => goPrevious(search)}>Previous</button>
              ) : null}
              {search.pageInfo.hasNextPage === true ? (
                <button onClick={() => goNext(search)}>Next</button>
              ) : null}
            </>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;

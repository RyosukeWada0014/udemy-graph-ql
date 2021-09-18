import client from "./client";
import { ApolloProvider, Query } from "react-apollo";
import { ME } from "./graphql";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Query query={ME}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log(data);
          return <div>{data.user.name}</div>;
        }}
      </Query>
      <div className="App">
        <div>Hello</div>
      </div>
    </ApolloProvider>
  );
};

export default App;

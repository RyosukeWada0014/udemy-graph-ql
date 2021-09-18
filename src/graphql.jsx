import gql from "graphql-tag";

export const ME = gql`
  query me {
    user(login: "RyosukeWada0014") {
      name
      avatarUrl
    }
  }
`;
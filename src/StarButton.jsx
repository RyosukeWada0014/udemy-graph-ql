import { SEARCH_REPOSITORIES } from "./graphql";

export const StarButton = (props) => {
  const {
    node,
    addOrRemoveStar,
    viewerHasStarred,
    first,
    after,
    last,
    before,
    query,
  } = props;
  const totalCount = node.stargazers.totalCount;
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`;

  return (
    <button
      onClick={() => {
        addOrRemoveStar({
          variables: { input: { starrableId: node.id } },
          update: (store, { data: { addStar, removeStar } }) => {
            const { starrable } = addStar || removeStar;
            console.log(starrable);
            const data = store.readQuery({
              query: SEARCH_REPOSITORIES,
              variables: { first, after, last, before, query },
            });
            const edges = data.search.edges;
            const newEdges = edges.map((edge) => {
              if (edge.node.id === node.id) {
                const totalCount = edge.node.stargazers.totalCount;
                const diff = starrable.viewerHasStarred ? 1 : -1;
                const newTotalCount = totalCount + diff;
                edge.node.stargazers.totalCount = newTotalCount;
              }
              return edge;
            });
            data.search.edges = newEdges;
            store.writeQuery({ query: SEARCH_REPOSITORIES, data });
          },
        });
      }}
    >
      {starCount} | {viewerHasStarred ? "stared" : "-"}
    </button>
  );
};

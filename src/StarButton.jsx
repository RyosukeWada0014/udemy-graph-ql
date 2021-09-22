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
        });
      }}
    >
      {starCount} | {viewerHasStarred ? "stared" : "-"}
    </button>
  );
};

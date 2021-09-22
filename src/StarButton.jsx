export const StarButton = (props) => {
  const { node, addStar } = props;
  console.log(addStar);
  const totalCount = node.stargazers.totalCount;
  const viewerHasStarred = node.viewerHasStarred;
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`;
  console.log(viewerHasStarred);

  return (
    <button
      onClick={() => {
        addStar({
          variables: { input: { starrableId: node.id } },
        });
      }}
    >
      {starCount} | {viewerHasStarred ? "stared" : "-"}
    </button>
  );
};

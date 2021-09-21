export const StarButton = (props) => {
  const { node } = props;
  const totalCount = node.stargazers.totalCount;
  const viewerHasStarred = node.viewerHasStarred;
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`;
  console.log(viewerHasStarred);

  return (
    <button>
      {starCount} | {viewerHasStarred ? "stared" : "-"}
    </button>
  );
};

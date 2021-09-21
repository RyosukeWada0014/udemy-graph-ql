export const StarButton = (props) => {
  const totalCount = props.node.stargazers.totalCount;

  return <button>{totalCount === 1 ? "1 star" : `${totalCount} stars`}</button>;
};

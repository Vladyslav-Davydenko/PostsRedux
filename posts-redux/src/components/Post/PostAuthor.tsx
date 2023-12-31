import { useSelector } from "react-redux";
import { selectAllUsers } from "../../helpers/users/UsersSlice";
import React from "react";

const PostAuthoComponent = (props: { userID: number }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === props.userID);

  return (
    <p className="post-author">{author ? `By ${author.name}` : "By Unknown"}</p>
  );
};

const PostAuthor = React.memo(PostAuthoComponent);
export default PostAuthor;

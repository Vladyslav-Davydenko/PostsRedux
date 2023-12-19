import { useGetUsersQuery } from "../../helpers/users/UsersSlice";
import { Link } from "react-router-dom";
import React from "react";

const PostAuthoComponent = (props: { userID: number }) => {
  const { data: users } = useGetUsersQuery();
  let author;
  if (users) author = users.find((user) => user.id === props.userID);

  return (
    <p className="post-author">
      {author ? (
        <Link to={`/user/${props.userID}`}>{author.name}</Link>
      ) : (
        "By Unknown"
      )}
    </p>
  );
};

const PostAuthor = React.memo(PostAuthoComponent);
export default PostAuthor;

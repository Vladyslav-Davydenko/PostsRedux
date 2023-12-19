import { useGetPostByUserIdQuery } from "../../helpers/posts/PostsSlice";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../helpers/users/UsersSlice";
import Post from "../Post/Post";
import Loader from "../UI/Loader/Loader";

export default function User() {
  const { userID } = useParams();
  const {
    data: postsForUser,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetPostByUserIdQuery(Number(userID));
  const { data: user } = useGetUserByIdQuery(Number(userID));

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p>{error as any}</p>;
  } else if (isSuccess) {
    const { ids } = postsForUser;
    content = ids.map((id) => <Post postID={id} key={id} />);
  }
  return (
    <section className="container">
      <h2>{user?.name}</h2>
      {content}
    </section>
  );
}

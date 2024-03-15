import { useAppSelector } from "../../helpers/store";
import { selectPostIds } from "../../helpers/posts/PostsSlice";
import Post from "../Post/Post";
import Loader from "../UI/Loader/Loader";

import { useGetPostsQuery } from "../../helpers/posts/PostsSlice";

export default function Posts() {
  const { isLoading, isError, isSuccess, error } = useGetPostsQuery();
  const posts = useAppSelector(selectPostIds);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = posts.map((postID) => {
      return <Post postID={postID as number} key={postID} />;
    });
  } else if (isError) {
    content = <p>{error as any}</p>;
  }

  return (
    <div className="container">
      <div className="posts">{content}</div>
    </div>
  );
}

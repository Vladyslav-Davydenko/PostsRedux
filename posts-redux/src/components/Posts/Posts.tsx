import { useSelector } from "react-redux";
import {
  selectPostIds,
  selectError,
  selectStatus,
} from "../../helpers/posts/PostsSlice";
import Post from "../Post/Post";
import Loader from "../UI/Loader/Loader";

export default function Posts() {
  const posts = useSelector(selectPostIds);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  let content;

  if (status === "loading") {
    content = <Loader />;
  } else if (status === "succeeded") {
    content = posts.map((postID) => {
      return <Post postID={postID as number} key={postID} />;
    });
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="container">
      <div className="posts">{content}</div>
    </div>
  );
}

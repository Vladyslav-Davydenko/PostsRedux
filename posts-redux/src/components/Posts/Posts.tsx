import { useSelector } from "react-redux";
import {
  selectAllPosts,
  selectError,
  selectStatus,
} from "../../helpers/posts/PostsSlice";
import Post from "../Post/Post";
import Loader from "../UI/Loader/Loader";

export default function Posts() {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  let content;

  if (status === "loading") {
    content = <Loader />;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => {
      return <Post post={post} key={post.id} />;
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

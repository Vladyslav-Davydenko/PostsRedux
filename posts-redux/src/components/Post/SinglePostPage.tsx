import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import PostDate from "./PostDate";
import PostReactions from "./PostReactions";
import { selectPostById } from "../../helpers/posts/PostsSlice";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../helpers/store";

export default function SinglePostPage() {
  const param = useParams();
  const postID = param.postID;
  const post = useSelector((state: RootState) =>
    selectPostById(state, Number(postID))
  );

  if (!post) {
    return (
      <section>
        <h2>Post was not found</h2>
      </section>
    );
  }
  return (
    <article className="container">
      <div className="post-container">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-content">
          {post.body.length > 100
            ? `${post.body.substring(0, 100)}...`
            : post.body}
        </p>
        <Link className="post-link" to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
        <PostAuthor userID={post.userId} />
        <PostReactions post={post} />
        <PostDate date={post.date} />
      </div>
    </article>
  );
}

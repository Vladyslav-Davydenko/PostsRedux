import { PostType } from "../../helpers/posts/PostsType";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import PostDate from "./PostDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../../helpers/posts/PostsSlice";
import { EntityState } from "@reduxjs/toolkit";

export default function Post(props: { postID: number }) {
  const { postID } = props;
  const post = useSelector((state: { posts: EntityState<PostType> }) =>
    selectPostById(state, postID)
  );

  return (
    <>
      {post && (
        <div className="post-container" key={post.id}>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">
            {post.body.length > 75
              ? `${post.body.substring(0, 75)}...`
              : post.body}
          </p>
          <Link className="post-link" to={`post/${postID}`}>
            View Post
          </Link>
          <PostAuthor userID={post.userId} />
          <PostReactions post={post} />
          <PostDate date={post.date} />
        </div>
      )}
    </>
  );
}

import { PostType } from "../../helpers/posts/PostsType";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import PostDate from "./PostDate";
import { Link } from "react-router-dom";
import React from "react";

let LinkToPostComponent = (props: { postID: string }) => {
  const { postID } = props;
  return (
    <Link className="post-link" to={`post/${postID}`}>
      View Post
    </Link>
  );
};

let LinkToPost = React.memo(LinkToPostComponent);

let PostComponent = (props: { post: PostType }): JSX.Element => {
  const { post } = props;

  return (
    <div className="post-container" key={post.id}>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">
        {post.body.length > 75 ? `${post.body.substring(0, 75)}...` : post.body}
      </p>
      <LinkToPost postID={post.id} />
      <PostAuthor userID={post.userId} />
      <PostReactions post={post} />
      <PostDate date={post.date} />
    </div>
  );
};

let Post = React.memo(PostComponent);
export default Post;

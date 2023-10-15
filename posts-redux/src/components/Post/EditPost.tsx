import { ChangeEvent } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  selectPostById,
  updatePost,
} from "../../helpers/posts/PostsSlice";
import { PostsType, Status } from "../../helpers/posts/PostsType";
import { selectAllUsers } from "../../helpers/users/UsersSlice";
import { AppDispatch } from "../../helpers/store";

export default function EditPost() {
  const params = useParams();
  const { postID } = params;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState<Status>("idle");

  const post = useSelector((state: { posts: PostsType }) =>
    selectPostById(state, Number(postID))
  );
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title ?? "Default Title");
  const [content, setContent] = useState(post?.body ?? "Default Content");
  const [userId, setUserId] = useState(post?.userId ?? "Default UserId");

  if (!post) {
    return (
      <section>
        <h2>Post was not found</h2>
      </section>
    );
  }

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) &&
    addRequestStatus === "idle" &&
    post;

  function onSavePostClicked() {
    if (canSave) {
      try {
        setAddRequestStatus("loading");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId: Number(userId),
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postID}`);
      } catch (err: any) {
        console.error("Failed to update the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }

  function onDeletePostClicked() {
    try {
      if (!post?.id) return;
      setAddRequestStatus("loading");
      dispatch(deletePost({ id: post?.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err: any) {
      console.error("Failed to delete the post", err);
    } finally {
      setAddRequestStatus("idle");
    }
  }

  return (
    <section className="posts-form">
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
}

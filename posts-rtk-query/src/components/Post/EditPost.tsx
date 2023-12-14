import { ChangeEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  selectPostById,
  useUpdatePostMutation,
} from "../../helpers/posts/PostsSlice";
import { selectAllUsers } from "../../helpers/users/UsersSlice";
import { RootState } from "../../helpers/store";

export default function EditPost() {
  const params = useParams();
  const { postID } = params;
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const post = useSelector((state: RootState) =>
    selectPostById(state, Number(postID))
  );
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title ?? "Default Title");
  const [content, setContent] = useState(post?.body ?? "Default Content");
  const [userId, setUserId] = useState<number | undefined>(
    post?.userId ?? undefined
  );

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
    setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading && post;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId: Number(userId),
          reactions: post.reactions,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId(undefined);
        navigate(`/post/${postID}`);
      } catch (err: any) {
        console.error("Failed to update the post", err);
      }
    }
  };

  const onDeletePostClicked = async () => {
    try {
      if (!post?.id) return;
      await deletePost({ id: post.id }).unwrap();

      setTitle("");
      setContent("");
      setUserId(undefined);
      navigate("/");
    } catch (err: any) {
      console.error("Failed to delete the post", err);
    }
  };

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

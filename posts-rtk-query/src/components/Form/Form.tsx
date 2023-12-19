import { useState, ChangeEvent } from "react";
import { useGetUsersQuery } from "../../helpers/users/UsersSlice";
import { useAddNewPostMutation } from "../../helpers/posts/PostsSlice";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const { data: users } = useGetUsersQuery();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  let usersOptions;

  if (users) {
    usersOptions = users.map((user) => {
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      );
    });
  }

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const body = content;
        await addNewPost({ title, body, userId: Number(userId) }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err: any) {
        console.error("Failed to save the post", err);
      }
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
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
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
      </form>
    </section>
  );
}

import { useSelector } from "react-redux";
import { selectPostsByUserID } from "../../helpers/posts/PostsSlice";
import { useParams } from "react-router-dom";
import { selectUserById } from "../../helpers/users/UsersSlice";
import { UsersType } from "../../helpers/users/UsersType";
import { PostsType } from "../../helpers/posts/PostsType";
import Post from "../Post/Post";

export default function User() {
  const { userID } = useParams();
  const user = useSelector((state: { users: UsersType }) =>
    selectUserById(state, Number(userID))
  );
  const postsForUser = useSelector((state: { posts: PostsType }) =>
    selectPostsByUserID(state, Number(userID))
  );

  const renderedPosts = postsForUser.map((post) => (
    <Post post={post} key={post.id} />
  ));
  console.log(user, postsForUser);
  return (
    <section className="container">
      <h2>{user?.name}</h2>
      {renderedPosts}
    </section>
  );
}

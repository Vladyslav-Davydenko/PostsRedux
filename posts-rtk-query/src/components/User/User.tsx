import { useSelector } from "react-redux";
import { selectPostsByUserID } from "../../helpers/posts/PostsSlice";
import { useParams } from "react-router-dom";
import { selectUserById } from "../../helpers/users/UsersSlice";
import Post from "../Post/Post";
import { RootState } from "../../helpers/store";

export default function User() {
  const { userID } = useParams();
  const user = useSelector((state: RootState) =>
    selectUserById(state, Number(userID))
  );
  const postsForUser = useSelector((state: RootState) =>
    selectPostsByUserID(state, Number(userID))
  );

  const renderedPosts = postsForUser.map((post) => (
    <Post postID={post.id} key={post.id} />
  ));
  console.log(user, postsForUser);
  return (
    <section className="container">
      <h2>{user?.name}</h2>
      {renderedPosts}
    </section>
  );
}

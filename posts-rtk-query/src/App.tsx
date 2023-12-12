import { Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import SinglePostPage from "./components/Post/SinglePostPage";
import EditPost from "./components/Post/EditPost";
import Users from "./components/Users/Users";
import User from "./components/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />

        <Route path="post">
          <Route index element={<Form />} />
          <Route path=":postID" element={<SinglePostPage />} />
          <Route path="edit/:postID" element={<EditPost />} />
        </Route>

        <Route path="user">
          <Route index element={<Users />} />
          <Route path=":userID" element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

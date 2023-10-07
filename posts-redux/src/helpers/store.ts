import PostsSlice from "./posts/PostsSlice";
import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./users/UsersSlice";

const store = configureStore({
    reducer: {
        posts: PostsSlice,
        users: UsersSlice
    }
})

export default store
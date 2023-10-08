import PostsSlice from "./posts/PostsSlice";
import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./users/UsersSlice";

const store = configureStore({
    reducer: {
        posts: PostsSlice,
        users: UsersSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
import { createSlice } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import { PostsType } from "./PostsType";

const initialState = {
        posts: [
        {
            id: '1',
            title: 'Learning Redux Toolkit',
            content: "I've heard good things.",
            date: sub(new Date(), { minutes: 10 }).toISOString(),
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
        },
        {
            id: '2',
            title: 'Slices...',
            content: "The more I say slice, the more I want pizza.",
            date: sub(new Date(), { minutes: 5 }).toISOString(),
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
        }
    ]
}

const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

    }
})

export const SelectAllPosts = (state: {posts: PostsType}) => state.posts.posts

export default PostsSlice.reducer
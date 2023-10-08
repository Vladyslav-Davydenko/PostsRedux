import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import { PostsType, PostType } from "./PostsType";
import { ReactionType } from "../../components/Post/PostReactions";

const initialState = {
        posts: [
        {
            id: '1',
            title: 'Learning Redux Toolkit',
            content: "I've heard good things.",
            userID: "0",
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
            userID: "1",
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
        addNewPost: {
            reducer(state, action: PayloadAction<PostType>){
                state.posts.push(action.payload)
            },
            prepare(title: string, userID: string, content: string){
                const newPost: PostType = {
                    id: nanoid(),
                    title,
                    content,
                    userID,
                    date: new Date().toISOString(),
                    reactions: {
                      thumbsUp: 0,
                      wow: 0,
                      heart: 0,
                      rocket: 0,
                      coffee: 0
                    }
                  };
                return {
                    payload: newPost
                }
            } 
        },
        addReaction: (state, action) => {
            const {postID, reaction} = action.payload;
            const currentPost = state.posts.find(post => post.id === postID)
            if(currentPost){
                currentPost.reactions[reaction as ReactionType] += 1;
            }
        }
    }
})

export const { addNewPost, addReaction } = PostsSlice.actions

export const SelectAllPosts = (state: {posts: PostsType}) => state.posts.posts

export default PostsSlice.reducer
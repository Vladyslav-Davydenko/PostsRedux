import { PayloadAction, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { PostsType, PostType } from "./PostsType";
import { ReactionType } from "../../components/Post/PostReactions";
import axios from "axios";

const FETCH_POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState: PostsType = {
        posts: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try{
        const responce = await axios.get(FETCH_POSTS_URL)
        return responce.data
    }
    catch(err: any){
        return err.message
    }
})

const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addNewPost: {
            reducer(state, action: PayloadAction<PostType>){
                state.posts.push(action.payload)
            },
            prepare(title: string, userID: string, body: string){
                const newPost: PostType = {
                    id: nanoid(),
                    title,
                    body,
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
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.fulfilled, (_, action: PayloadAction<PostType[]>) => {
            const posts = action.payload.map(post => {
                return {
                    ...post,
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                      }
                }
            })

            return {
                posts,
                status: "succeeded",
                error: null
            }
        })
        .addCase(fetchPosts.pending, (state, _) => {
            state.status = "loading"
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message ?? "Something wrong"
        })
    },
})

export const { addNewPost, addReaction } = PostsSlice.actions

export const selectAllPosts = (state: {posts: PostsType}) => state.posts.posts
export const selectStatus = (state: {posts: PostsType}) => state.posts.status
export const selectError = (state: {posts: PostsType}) => state.posts.error

export default PostsSlice.reducer
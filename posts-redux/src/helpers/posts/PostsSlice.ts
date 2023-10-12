import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { PostsType, PostType } from "./PostsType";
import { ReactionType } from "../../components/Post/PostReactions";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState: PostsType = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const responce = await axios.get(POSTS_URL);
  return responce.data;
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (initialPost: { title: string; body: string; userId: string }) => {
    try {
      const responce = await axios.post(POSTS_URL, initialPost);
      return responce.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: Omit<PostType, "date">) => {
    const { id } = initialPost;
    try {
      const responce = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return responce.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: {
      reducer(state, action: PayloadAction<PostType>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, userId: string, body: string) {
        const newPost: PostType = {
          id: nanoid(),
          title,
          body,
          userId,
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        };
        return {
          payload: newPost,
        };
      },
    },
    addReaction: (state, action) => {
      const { postID, reaction } = action.payload;
      const currentPost = state.posts.find((post) => post.id === postID);
      if (currentPost) {
        currentPost.reactions[reaction as ReactionType] += 1;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (_, action: PayloadAction<PostType[]>) => {
        const posts = action.payload.map((post) => {
          return {
            ...post,
            id: String(post.id),
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          };
        });

        return {
          posts,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchPosts.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something wrong";
      })
      .addCase(
        addPost.fulfilled,
        (
          state,
          action: PayloadAction<{ title: string; body: string; userId: string }>
        ) => {
          const newPost: PostType = {
            id: nanoid(),
            title: action.payload.title,
            body: action.payload.body,
            userId: action.payload.userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          };
          state.posts.push(newPost);
        }
      )
      .addCase(
        updatePost.fulfilled,
        (state, action: PayloadAction<PostType>) => {
          if (!action.payload?.id) {
            console.log("Update could not complete");
            console.log(action.payload);
            return;
          }
          action.payload.id = String(action.payload.id);
          let { id } = action.payload;
          action.payload.date = new Date().toISOString();
          const posts = state.posts.filter((post) => post.id !== id);
          state.posts = [...posts, action.payload];
        }
      );
  },
});

export const { addNewPost, addReaction } = PostsSlice.actions;

export const selectAllPosts = (state: { posts: PostsType }) =>
  state.posts.posts;
export const selectStatus = (state: { posts: PostsType }) => state.posts.status;
export const selectError = (state: { posts: PostsType }) => state.posts.error;
export const selectPostById = (
  state: { posts: PostsType },
  postID: string | undefined
) => state.posts.posts.find((post) => post.id === postID);

export default PostsSlice.reducer;

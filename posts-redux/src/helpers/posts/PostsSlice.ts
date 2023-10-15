import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { PostsType, PostType, Status } from "./PostsType";
import { ReactionType } from "../../components/Post/PostReactions";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a: PostType, b: PostType) => b.date.localeCompare(a.date),
});

type InitialPostState = EntityState<PostType> & {
  status: Status;
  error: string | null;
};

const initialState: InitialPostState = postsAdapter.getInitialState({
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const responce = await axios.get(POSTS_URL);
  return responce.data;
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (initialPost: { title: string; body: string; userId: number }) => {
    const responce = await axios.post(POSTS_URL, initialPost);
    return responce.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: Omit<PostType, "date">) => {
    const { id } = initialPost;

    // try-catch only for developing testing
    try {
      const responce = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return responce.data;
    } catch (err: any) {
      //return err.message;
      return initialPost; // only for testing Redux
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delePost",
  async (initialPost: { id: number }) => {
    const { id } = initialPost;

    const responce = await axios.delete(`${POSTS_URL}/${id}`);
    if (responce?.status === 200) return initialPost;
    // return `${responce?.status}: ${responce?.statusText}`;
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // addNewPost: {
    //   reducer(state, action: PayloadAction<PostType>) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title: string, userId: number, body: string) {
    //     const newPost: PostType = {
    //       id: nanoid(),
    //       title,
    //       body,
    //       userId,
    //       date: new Date().toISOString(),
    //       reactions: {
    //         thumbsUp: 0,
    //         wow: 0,
    //         heart: 0,
    //         rocket: 0,
    //         coffee: 0,
    //       },
    //     };
    //     return {
    //       payload: newPost,
    //     };
    //   },
    // },
    addReaction: (state, action) => {
      const { postID, reaction } = action.payload;
      const currentPost = state.entities[postID];
      if (currentPost) {
        currentPost.reactions[reaction as ReactionType] += 1;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostType[]>) => {
          state.status = "succeeded";

          const posts = action.payload.map((post) => {
            return {
              ...post,
              id: post.id,
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

          postsAdapter.upsertMany(state, posts);
        }
      )
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
          action: PayloadAction<{ title: string; body: string; userId: number }>
        ) => {
          const newPost: PostType = {
            id: (state.ids[state.ids.length - 1] as number) + 1,
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

          postsAdapter.addOne(state, newPost);
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
          action.payload.date = new Date().toISOString();
          postsAdapter.upsertOne(state, action.payload);
        }
      )
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        console.log(action.payload);
        postsAdapter.removeOne(state, action.payload.id);
      });
  },
});

type statePosts = { posts: PostsType };

export const { addReaction } = PostsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state: { posts: EntityState<PostType> }) => state.posts
);

export const selectStatus = (state: statePosts) => state.posts.status;
export const selectError = (state: statePosts) => state.posts.error;

export const selectPostsByUserID = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
// export const selectPostsByUserID = (
//   state: { posts: PostsType },
//   userId: number
// ) => state.posts.posts.filter((post) => post.userId === userId);

export default PostsSlice.reducer;

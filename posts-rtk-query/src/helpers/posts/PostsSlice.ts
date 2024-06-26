import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { PostType } from "./PostsType";
import { apiSlice } from "../api/apiSlice";
import { sub } from "date-fns";
import { RootState } from "../store";

const postsAdapter = createEntityAdapter<PostType>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: EntityState<PostType, number> =
  postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<PostType, number>, void>({
      query: () => "/posts",
      transformResponse: (responseData: PostType[]) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });

        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result) => {
        if (!result?.ids) {
          return [{ type: "Post", id: "LIST" }];
        }
        return [
          { type: "Post", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Post" as const, id })),
        ];
      },
    }),
    getPostsByUserId: builder.query<EntityState<PostType, number>, number>({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responce: PostType[]) => {
        let min = 1;
        const loadedPosts = responce.map((post) => {
          if (!post.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result) => {
        if (!result?.ids) return [{ type: "Post", id: "LIST" }];
        return [...result.ids.map((id) => ({ type: "Post" as const, id }))];
      },
    }),
    addNewPost: builder.mutation<void, Partial<PostType>>({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation<void, Partial<PostType>>({
      query: (updatedPost) => ({
        url: `/posts/${updatedPost.id}`,
        method: "PUT",
        body: {
          ...updatedPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation<void, Partial<PostType>>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation<void, { postID: number; reactions: any }>({
      query: ({ postID, reactions }) => ({
        url: `posts/${postID}`,
        method: "PATCH",
        body: { reactions },
      }),
      async onQueryStarted(
        { postID, reactions },
        { dispatch, queryFulfilled }
      ) {
        const patchResults = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              const post = draft.entities[postID];
              if (post) post.reactions = reactions;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResults.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddReactionMutation,
} = extendedApiSlice;

export const selectPostResult = extendedApiSlice.endpoints.getPosts.select();

export const selectPostData = createSelector(
  selectPostResult,
  (postResults) => postResults.data // normalized state object with ids and enteties
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state: RootState) => selectPostData(state) ?? initialState
);

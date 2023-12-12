import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { PostType } from "./PostsType";
import { apiSlice } from "../api/apiSlice";
import { sub } from "date-fns";

const postsAdapter = createEntityAdapter({
  sortComparer: (a: PostType, b: PostType) => b.date.localeCompare(a.date),
});

const initialState: EntityState<PostType, number> =
  postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<PostType, number>, void>({
      query: () => "/posts",
      transformResponse: (responceData: PostType[]) => {
        let min = 1;
        const loadedPosts = responceData.map((post) => {
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
      providesTags: (result, error, arg) => {
        if (!result?.ids) {
          return [{ type: "Post" as const, id: "LIST" }];
        }
        return [
          { type: "Post" as const, id: "LIST" },
          ...result.ids.map((id) => ({ type: "Post" as const, id })),
        ];
      },
    }),
  }),
});

export const { useGetPostsQuery } = extendedApiSlice;

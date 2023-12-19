import { apiSlice } from "../api/apiSlice";
import { UserType } from "./UsersType";

export const extendedApiUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], void>({
      query: () => `/users`,
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query<UserType, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = extendedApiUserSlice;

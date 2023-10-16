import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { UsersType } from "./UsersType";

const FETCH_USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const responce = await axios.get(FETCH_USERS_URL);
    return responce.data;
  } catch (err: any) {
    return err.message;
  }
});

const initialState: UsersType = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return {
        users: [...action.payload],
      };
    });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;

export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;

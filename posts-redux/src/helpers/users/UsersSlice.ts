import { createSlice } from "@reduxjs/toolkit";
import { UsersType } from "./UsersType";

const initialState = {
    users: [
        { id: '0', name: 'Dude Lebowski' },
        { id: '1', name: 'Neil Young' },
        { id: '2', name: 'Dave Gray' }
    ]
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state: {users: UsersType}) => state.users.users;

export default usersSlice.reducer
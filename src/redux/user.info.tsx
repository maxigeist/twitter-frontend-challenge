import {User} from "../service";
import {createSlice} from "@reduxjs/toolkit";


const initialState: User = {
    id: "",
    name: "",
    profilePicture: "",
    username: "",
    private: false,
    createdAt: new Date(),
    followers: [],
    following: [],
    posts: [],
}

const userInfoSlice = createSlice({
    name: "user-info",
    initialState,
    reducers: {
        updateData: (state, action) => {
            Object.assign(state, action.payload);
        },
        updateFollowers: (state, action) => {
            state.followers = action.payload;
        },
        updateFollowing: (state, action) => {
            state.following = action.payload;
        },
        updatePosts: (state, action) => {
            state.posts = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPrivate: (state, action) => {
            state.private = action.payload;
        },
        setCreatedAt: (state, action) => {
            state.createdAt = action.payload;
        },
    },
});

export const {
    updateFollowers,
    updateFollowing,
    updatePosts,
    setId,
    setName,
    setProfilePicture,
    setUsername,
    setPrivate,
    setCreatedAt,
    updateData
} = userInfoSlice.actions;


export default userInfoSlice.reducer
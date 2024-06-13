import {createSlice} from "@reduxjs/toolkit";
import {LIMIT} from "../util/Constants";
import {ChatDTO, Post} from "../service";

type InitalStateType = {
  feed: Post[];
  profileFeed:[];
  query: string;
  length: number;
  lastPost:string;
  currentChat?: ChatDTO;
};

const initialState: InitalStateType = {
  feed: [],
  profileFeed:[],
  length: LIMIT,
  query: `?limit=${LIMIT}`,
  lastPost:''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFeed: (state, action) => {
      state.feed = action.payload;
    },
    updateProfileFeed: (state,action) => {
      state.profileFeed = action.payload
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setLastPost: (state, action) => {
      state.lastPost = action.payload
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    setChat: (state, action) => {
      state.currentChat = action.payload;
    },

    addMessage: (state, action) => {
      if (state.currentChat) {
        state.currentChat.messages.push(action.payload);
      }
    },
  },
});

export const {updateFeed, setLength, setQuery, setChat, addMessage, setLastPost, updateProfileFeed} =
    userSlice.actions;

export default userSlice.reducer;

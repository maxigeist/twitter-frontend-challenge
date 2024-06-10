import {Author, ChatDTO, ChatViewDTO} from "../service";
import {createSlice} from "@reduxjs/toolkit";

type InitialStateType = {
    id: string,
    users: Author[],
    chats: ChatViewDTO[]
    currentChat: ChatDTO | null
}


const initialState: InitialStateType = {
    id: '',
    users: [],
    chats: [],
    currentChat: null ,
}


const socketSlice = createSlice({
    name:'socket',
    initialState,
    reducers: {
        updateSocket:(state, action) => {
            Object.assign(state, action.payload)
        },
        updateChats: (state, action) => {
            state.chats = action.payload
        },
        updateCurrentChat:(state, action) => {
            state.currentChat = action.payload
        },
        updateCurrentChatMessages:(state, action) => {
            state.currentChat!!.messages = action.payload
        }
    }
})

export const {updateSocket, updateChats, updateCurrentChat, updateCurrentChatMessages} = socketSlice.actions

export default socketSlice.reducer
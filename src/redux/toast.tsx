import {ToastProps, ToastType} from "../components/toast/Toast";
import {createSlice} from "@reduxjs/toolkit";


const initialState: ToastProps = {
    message: '',
    type: ToastType.ALERT,
    show: false
}

const toastSlice = createSlice({
    name:'toast',
    initialState,
    reducers:{
        updateToastData:(state, action)=> {
            Object.assign(state, action.payload);
        },
        updateMessage: (state, action) => {
            state.message = action.payload
        },
        updateType: (state, action) => {
            state.type = action.payload
        },
        updateShow: (state, action) => {
            state.show = action.payload
        }
    }
})

export const {
    updateToastData,
    updateMessage,
    updateType,
    updateShow
} = toastSlice.actions;

export default toastSlice.reducer
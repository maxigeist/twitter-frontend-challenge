import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import userInfo from "./user.info";
import toast from './toast'
import socket from "./socket";

export const store = configureStore({
  reducer: { user, userInfo, toast, socket },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

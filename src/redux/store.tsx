import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import userInfo from "./user.info";
import toast from './toast'

export const store = configureStore({
  reducer: { user, userInfo, toast },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

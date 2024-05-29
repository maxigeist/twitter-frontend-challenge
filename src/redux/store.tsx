import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import userInfo from "./user.info";

export const store = configureStore({
  reducer: { user, userInfo },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

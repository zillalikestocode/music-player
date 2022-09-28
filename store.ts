import { configureStore } from "@reduxjs/toolkit";
import { playlistIdSlice, playlistSlice } from "./slices/playListSlice";

export const store = configureStore({
  reducer: {
    playlistId: playlistIdSlice.reducer,
    playlist: playlistSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

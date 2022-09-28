import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IdState {
  value: string;
}

const initialState: IdState = {
  value: "",
};
export const playlistIdSlice = createSlice({
  name: "playlistId",
  initialState,
  reducers: {
    changeId: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    value: {},
  },
  reducers: {
    changePlaylist: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});
export const { changeId } = playlistIdSlice.actions;
export const { changePlaylist } = playlistSlice.actions;

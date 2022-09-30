import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  value: any;
}
const initialState: State = {
  value: null,
};

export const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    change: (state: any, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});
export const isPlayingSlice = createSlice({
  name: "isPlaying",
  initialState: {
    value: false,
  },
  reducers: {
    set: (state: any, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { change } = currentTrackSlice.actions;
export const { set } = isPlayingSlice.actions;

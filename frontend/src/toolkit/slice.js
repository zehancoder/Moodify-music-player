import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: {
    success: false,
    message: "",
    data: {},
  },
  loading: false,
  songs: {
    success: false,
    message: "",
    data: [],
  },
  faceExpression: "happy",
};
export const reduxSlice = createSlice({
  name: "moodify",
  initialState,
  reducers: {
    currentUser: (state, aciton) => {
      state.user = aciton.payload;
    },
    loadingState: (state, action) => {
      state.loading = action.payload;
    },
    faceExpression: (state, action) => {
      state.faceExpression = action.payload;
    },
    songState: (state, action) => {
      state.songs.data = action.payload;
    }
  },
});

export const { currentUser, loadingState, faceExpression ,songState } = reduxSlice.actions;
export default reduxSlice.reducer;

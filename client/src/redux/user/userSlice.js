import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Start the sign-in process, set loading to true
    signInStart: (state) => {
      state.loading = true;
    },
    // Successful sign-in, set currentUser and stop loading
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // Check if this line is working as expected
      state.loading = false;
      state.error = null;
    },
    // Failed sign-in, set error and stop loading
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess,updateUserFailure,updateUserStart,updateUserSuccess } = userSlice.actions;
export default userSlice.reducer;
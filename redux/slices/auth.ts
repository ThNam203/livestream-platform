import { createSlice } from "@reduxjs/toolkit";

const initialState = { hasLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.hasLoggedIn = true;
    },
    logout(state) {
      state.hasLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

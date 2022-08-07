import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    id:"HI",
    email:null,
    username:null,
    token: null,
    role: []
  },
  reducers: {
    loginSuccess: (state, action) => {
      let { token , role = [], id, email, username } = action.payload;
      state.isLogin = true;
      state.token = token;
      state.role = role;
      state.email = email;
      state.username = username;
      state.id = id;
    },
    logoutSuccess: (state, action) => {
      state.isLogin = false;
      state.token = null;
      state.role = [];
      state.email = null;
      state.username = null;
      state.id = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
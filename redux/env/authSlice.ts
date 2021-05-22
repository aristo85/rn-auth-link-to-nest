import { createSlice } from "@reduxjs/toolkit";
import {
  confirmAccount,
  confirmForgotPassword,
  facebookAuth,
  forgotPassword,
  newPassOnForgotPass,
  requestCreateUser,
  requestLogin,
} from "./thunk/auth";
import { ForgotPassword, RegRequest, ResetCodeForgotPass, User } from "./types";

type UserState = {
  status: "loading" | "idle";
  error: string | null;
  user: User;
  requestReg: RegRequest;
  emailSent: ForgotPassword;
  confirmForgotPassRes: ResetCodeForgotPass;
};

const initialState = {
  user: {},
  error: null,
  status: "idle",
  requestReg: { success: false },
  emailSent: { success: false },
  confirmForgotPassRes: { success: false, email: "", resetCode: 0 },
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(requestCreateUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(requestCreateUser.fulfilled, (state, { payload }) => {
      state.requestReg = payload;
      state.status = "idle";
    });

    builder.addCase(requestCreateUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
    // confirm account
    builder.addCase(confirmAccount.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(confirmAccount.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
    });

    builder.addCase(confirmAccount.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
    // login account
    builder.addCase(requestLogin.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(requestLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
    });

    builder.addCase(requestLogin.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
    // forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.emailSent = payload;
      state.status = "idle";
    });

    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
    // confirm forgot password response
    builder.addCase(confirmForgotPassword.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(confirmForgotPassword.fulfilled, (state, { payload }) => {
      state.confirmForgotPassRes = payload;
      state.status = "idle";
    });

    builder.addCase(confirmForgotPassword.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
    // send new pass on forgot password response
    builder.addCase(newPassOnForgotPass.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(newPassOnForgotPass.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
    });

    builder.addCase(newPassOnForgotPass.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
    // facebook authentication
    builder.addCase(facebookAuth.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(facebookAuth.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
    });

    builder.addCase(facebookAuth.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

export default userSlice.reducer;

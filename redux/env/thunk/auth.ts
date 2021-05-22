import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../..";
import { ActivateAccCode } from "../../../components/auth/ActivationCodeModal";
import { envConfig } from "../../../data/config";
import { setObject, remove } from "../../../data/localStorage";
import { setLogOut, setToken } from "../envSlice";
import {
  RegRequest,
  User,
  RegData,
  LoginData,
  ForgotPassword,
  ResetCodeForgotPass,
  ResetForgotPass,
  FacebookAuthData,
} from "../types";

// login request
export const requestLogin = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: any }
>("auth/login/request", async (loginData, thunkApi) => {
  const response = await fetch(`${envConfig.Url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(loginData),
  });

  const resData = await response.json();
  // console.log("status===>", resData.message)
  if (response.status >= 400 && response.status < 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue(resData.message);
  }

  if (response.status >= 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue("something went wrong with server");
  }

  // extract token and create expire date then save them in local storage and env store
  const expireDate: number =
    new Date().getTime() + envConfig.tokenExpireTime * 1000;
  thunkApi.dispatch(
    authentication(resData.token, resData.user._id, expireDate)
  );

  return resData as User;
});

// facebook login request
export const facebookAuth = createAsyncThunk<
  User,
  FacebookAuthData,
  { rejectValue: any }
>("auth/facebook", async (loginData, thunkApi) => {
  const response = await fetch(`${envConfig.Url}/auth/account/facebook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(loginData),
  });

  const resData = await response.json();
  // console.log("status===>", resData.message)
  if (response.status >= 400 && response.status < 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue(resData.message);
  }

  if (response.status >= 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue("something went wrong with server");
  }

  // extract token and create expire date then save them in local storage and env store
  const expireDate: number =
    new Date().getTime() + envConfig.tokenExpireTime * 1000;
  thunkApi.dispatch(
    authentication(resData.token, resData.user._id, expireDate)
  );

  return resData as User;
});

// registeration request
export const requestCreateUser = createAsyncThunk<
  RegRequest,
  RegData,
  { rejectValue: any }
>("auth/create/request", async (userData, thunkApi) => {
  const response = await fetch(`${envConfig.Url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(userData),
  });

  const resData = await response.json();

  if (response.status >= 400 && response.status < 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue(resData.message);
  }

  if (response.status >= 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue("something went wrong with server");
  }

  return resData as RegRequest;
});

// confirm account
export const confirmAccount = createAsyncThunk<
  User,
  ActivateAccCode,
  { rejectValue: any }
>("auth/confirmAccount", async (code, thunkApi) => {
  const response = await fetch(`${envConfig.Url}/auth/account/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(code),
  });

  const resData = await response.json();

  if (response.status >= 400 && response.status < 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue(resData.message);
  }

  if (response.status >= 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue("something went wrong with server");
  }

  // extract token and create expire date then save them in local storage and env store
  const expireDate: number =
    new Date().getTime() + envConfig.tokenExpireTime * 1000;
  thunkApi.dispatch(
    authentication(resData.token, resData.user._id, expireDate)
  );

  return resData as User;
});

// forgot password
export const forgotPassword = createAsyncThunk<
  ForgotPassword,
  { email: string },
  { rejectValue: any }
>("auth/forgotPassword", async (email, thunkApi) => {
  const response = await fetch(`${envConfig.Url}/auth/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(email),
  });

  const resData = await response.json();

  if (response.status >= 400 && response.status < 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue(resData.message);
  }

  if (response.status >= 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue("something went wrong with server");
  }

  return resData as ForgotPassword;
});

// send reset code for forgot password
export const confirmForgotPassword = createAsyncThunk<
  ResetCodeForgotPass,
  { resetCode: number },
  { rejectValue: any }
>("auth/confirmForgotPassword", async (codeObj, thunkApi) => {
  const response = await fetch(`${envConfig.Url}/auth/reset/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(codeObj),
  });

  const resData = await response.json();

  if (response.status >= 400 && response.status < 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue(resData.message);
  }

  if (response.status >= 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue("something went wrong with server");
  }

  return resData as ResetCodeForgotPass;
});

// send new password on forgot password
export const newPassOnForgotPass = createAsyncThunk<
  User,
  ResetForgotPass,
  { rejectValue: any }
>("auth/newPassOnForgotPass", async (resetData, thunkApi) => {
  const response = await fetch(`${envConfig.Url}/auth/reset/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(resetData),
  });

  const resData = await response.json();

  if (response.status >= 400 && response.status < 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue(resData.message);
  }

  if (response.status >= 500) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue("something went wrong with server");
  }

  // extract token and create expire date then save them in local storage and env store
  const expireDate: number =
    new Date().getTime() + envConfig.tokenExpireTime * 1000;
  thunkApi.dispatch(
    authentication(resData.token, resData.user._id, expireDate)
  );

  return resData as User;
});

// **************

// after signup or login save auth data in both local storage and redux

let timer: any;
//authentication action creator
export const authentication = (
  token: string,
  userId: string,
  expireDate: number
) => {
  return (dispatch: AppDispatch) => {
    dispatch(expireSetTimeout(expireDate));
    dispatch(setToken({ token, expireDate, userId }));
    saveDatatOnDevice(token, userId, expireDate);
  };
};

//saving data on device locally with 'AsyncStorage'
const saveDatatOnDevice = async (
  token: string,
  userId: string,
  expiry: number
) => {
  await setObject("authData", {
    token: token,
    userId: userId,
    expireDate: expiry,
  });
};

//setting timer and auto logout when duration finished
const expireSetTimeout = (expireDate: number) => {
  return (dispatch: AppDispatch) => {
    const timeToExpiration = expireDate - new Date().getTime();
    timer = setTimeout(() => {
      dispatch(logOut());
    }, timeToExpiration);
  };
};

//logout action creator
export const logOut = () => {
  return (dispatch: AppDispatch) => {
    remove("authData");
    clearTimeoutTimer();
    dispatch(setLogOut());
  };
};

//clear the timer
const clearTimeoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

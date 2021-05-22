import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LangType = "en" | "ku" | "ar";
type authType = {
  token: string;
  expireDate: number;
  userId: string;
};

interface envState {
  language: LangType;
  auth: authType;
  isTriedAutoLogin: boolean;
}

const initialState: envState = {
  language: "en",
  auth: { token: "", expireDate: 0, userId: "" },
  isTriedAutoLogin: false,
};

const counterSlice = createSlice({
  name: "env",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LangType>) => ({
      ...state,
      language: action.payload,
    }),
    setToken: (state, action: PayloadAction<authType>) => ({
      ...state,
      auth: {
        token: action.payload.token,
        expireDate: action.payload.expireDate,
        userId: action.payload.userId,
      },
    }),
    tryAutoLogin: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isTriedAutoLogin: action.payload,
    }),
    setLogOut: (state) => ({
      ...state,
      auth: { token: "", expireDate: 0, userId: "" },
    }),
  },
});

export const { setLanguage, setToken, tryAutoLogin, setLogOut } =
  counterSlice.actions;
export default counterSlice.reducer;

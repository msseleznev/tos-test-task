import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  isLoggedIn: boolean;
};
const initialState: SliceState = {
  isLoggedIn: true,
};
const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const loginReducer = slice.reducer;
export const { setIsLoggedIn } = slice.actions;

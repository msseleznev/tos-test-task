import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../../api/api';
import { MESSAGES_FOR_SUCCESS_BAR } from '../../ui/common/SnackBar/SnackBar';
import { setIsLoggedIn } from '../login/login-reducer';
import { AppThunk, NullableType } from '../store';

type SliceStateType = {
  appError: NullableType<string>;
  appMessage: MESSAGES_FOR_SUCCESS_BAR;
  appIsInitialize: boolean;
  isAppFetching: boolean;
};
const initialState: SliceStateType = {
  appError: '',
  appMessage: '' as MESSAGES_FOR_SUCCESS_BAR,
  appIsInitialize: false,
  isAppFetching: false,
};
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError(state, action: PayloadAction<string>) {
      state.appError = action.payload;
    },
    setAppIsInitialize(state, action: PayloadAction<boolean>) {
      state.appIsInitialize = action.payload;
    },
    setIsAppFetching(state, action: PayloadAction<boolean>) {
      state.isAppFetching = action.payload;
    },
    setAppMessage(state, action: PayloadAction<MESSAGES_FOR_SUCCESS_BAR>) {
      state.appMessage = action.payload;
    },
  },
});

export type AppActionsType =
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppIsInitialize>
  | ReturnType<typeof setIsAppFetching>
  | ReturnType<typeof setAppMessage>;

export const appReducer = slice.reducer;
export const { setAppError, setAppIsInitialize, setIsAppFetching, setAppMessage } =
  slice.actions;
export const initializeApp = (): AppThunk => dispatch => {
  authAPI
    .me()
    .then(() => {
      dispatch(setIsLoggedIn(true));
    })
    .catch(() => {
      dispatch(setIsLoggedIn(false));
    })
    .finally(() => {
      dispatch(setAppIsInitialize(true));
    });
};

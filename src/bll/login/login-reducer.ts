import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginParamsType } from '../../types/types';
import { MESSAGES_FOR_SUCCESS_BAR } from '../../ui/common/SnackBar/SnackBar';
import { setAppMessage, setIsAppFetching } from '../app/app-reducer';
import { saveToken } from '../utils/localstorage-utils';

import { authAPI } from 'api/api';
import { AppThunk } from 'bll/store';

type SliceState = {
  isLoggedIn: boolean;
};
const initialState: SliceState = {
  isLoggedIn: false,
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
export type LoginActionsType = ReturnType<typeof setIsLoggedIn>;

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  dispatch => {
    dispatch(setIsAppFetching(true));
    authAPI
      .login(data)
      .then(res => {
        saveToken(res.data.access_token);
        dispatch(setIsLoggedIn(true));
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.LOGGED_IN_SUCCESSFULLY));
      })
      .catch(() => {
        dispatch(setIsLoggedIn(false));
      })
      .finally(() => {
        dispatch(setIsAppFetching(false));
      });
  };

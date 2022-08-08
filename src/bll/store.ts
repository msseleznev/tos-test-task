import { combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { AppActionsType, appReducer } from './app/app-reducer';
import { ContactsActionsType, contactsReducer } from './contacts/contacts-reducer';
import { loginReducer } from './login/login-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  contacts: contactsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ActionsType = ContactsActionsType | AppActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
>;

export type NullableType<T> = null | T;

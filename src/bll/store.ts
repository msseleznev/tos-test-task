import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { contactsReducer } from './contacts/contacts-reducer';
import { loginReducer } from './login/login-reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  contacts: contactsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { contactsAPI } from '../../api/api';
import { ContactType } from '../../types/types';
import { MESSAGES_FOR_SUCCESS_BAR } from '../../ui/common/SnackBar/SnackBar';
import { setAppError, setAppMessage, setIsAppFetching } from '../app/app-reducer';
import { AppThunk } from '../store';

type SliceStateType = {
  contacts: ContactType[];
};
const initialState: SliceStateType = {
  contacts: [],
};
const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContacts(state, action: PayloadAction<ContactType[]>) {
      state.contacts = action.payload;
    },
  },
});

export type ContactsActionsType = ReturnType<typeof getContacts>;

export const contactsReducer = slice.reducer;
export const { getContacts } = slice.actions;

export const getContactsTC = (): AppThunk => dispatch => {
  dispatch(setIsAppFetching(true));
  contactsAPI
    .getContacts()
    .then(res => {
      dispatch(getContacts(res.data));
    })
    .catch(error => {
      const data = error?.response?.data;

      if (axios.isAxiosError(error) && data) {
        dispatch(setAppError(data.error || 'Some error occurred'));
      } else dispatch(setAppError(`${error.message}. More details in the console`));
    })
    .finally(() => {
      dispatch(setIsAppFetching(false));
    });
};
export const deleteContactTC =
  (id: string): AppThunk =>
  dispatch => {
    contactsAPI
      .deleteContact(id)
      .then(() => {
        dispatch(getContactsTC());
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CONTACT_SUCCESSFULLY_REMOVED));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;

        console.log(error);
      });
  };
export const editContactTC =
  (params: ContactType): AppThunk =>
  dispatch => {
    contactsAPI
      .editContact(params)
      .then(() => {
        dispatch(getContactsTC());
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CONTACT_CHANGED_SUCCESSFULLY));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;

        console.log(error);
      });
  };
export const createContactTC =
  (params: ContactType): AppThunk =>
  dispatch => {
    contactsAPI
      .createContact(params)
      .then(() => {
        dispatch(getContactsTC());
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NEW_CONTACT_SUCCESSFULLY_ADDED));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;

        console.log(error);
      });
  };

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { contactsAPI } from '../../api/api';
import { ContactType, SortOptionsType, SortOrderType } from '../../types/types';
import { MESSAGES_FOR_SUCCESS_BAR } from '../../ui/common/SnackBar/SnackBar';
import { setAppMessage, setIsAppFetching } from '../app/app-reducer';
import { AppThunk } from '../store';

type SliceStateType = {
  contactsData: ContactType[];
  contactsForRender: ContactType[];
  isNotFound: boolean;
};

const initialState: SliceStateType = {
  contactsData: [],
  contactsForRender: [],
  isNotFound: false,
};
const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContacts(state, action: PayloadAction<ContactType[]>) {
      state.contactsData = action.payload;
      state.contactsForRender = action.payload;
    },
    setSorting(
      state,
      action: PayloadAction<{ sortOptions: SortOptionsType; sortOrder: SortOrderType }>,
    ) {
      const sortUsersData = state.contactsData.sort((a, b) =>
        a[action.payload.sortOptions] <= b[action.payload.sortOptions] ? -1 : 1,
      );

      if (action.payload.sortOrder === 'down') {
        state.contactsForRender = sortUsersData;
      }

      if (action.payload.sortOrder === 'up') {
        state.contactsForRender = sortUsersData.reverse();
      }
    },
    setIsNotFound(state, action: PayloadAction<boolean>) {
      state.isNotFound = action.payload;
    },
  },
});

export type ContactsActionsType =
  | ReturnType<typeof getContacts>
  | ReturnType<typeof setSorting>
  | ReturnType<typeof setIsNotFound>;

export const contactsReducer = slice.reducer;
export const { getContacts, setSorting, setIsNotFound } = slice.actions;

export const getContactsTC = (): AppThunk => dispatch => {
  dispatch(setIsAppFetching(true));
  contactsAPI
    .getContacts()
    .then(res => {
      dispatch(getContacts(res.data));
    })
    .catch(() => {})
    .finally(() => {
      dispatch(setIsAppFetching(false));
    });
};
export const deleteContactTC =
  (id: string): AppThunk =>
  dispatch => {
    contactsAPI.deleteContact(id).then(() => {
      dispatch(getContactsTC());
      dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CONTACT_SUCCESSFULLY_REMOVED));
    });
  };
export const editContactTC =
  (params: ContactType): AppThunk =>
  dispatch => {
    contactsAPI.editContact(params).then(() => {
      dispatch(getContactsTC());
      dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CONTACT_CHANGED_SUCCESSFULLY));
    });
  };
export const createContactTC =
  (params: ContactType): AppThunk =>
  dispatch => {
    contactsAPI.createContact(params).then(() => {
      dispatch(getContactsTC());
      dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NEW_CONTACT_SUCCESSFULLY_ADDED));
    });
  };
export const searchContactTC =
  (searchValue: string): AppThunk =>
  dispatch => {
    dispatch(setIsAppFetching(true));
    dispatch(setIsNotFound(false));
    contactsAPI
      .searchContact(searchValue)
      .then(res => {
        if (res.data.length === 0) {
          dispatch(setIsNotFound(true));
        }
        dispatch(getContacts(res.data));
      })
      .finally(() => {
        dispatch(setIsAppFetching(false));
      });
  };

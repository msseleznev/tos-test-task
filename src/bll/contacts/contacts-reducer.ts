import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContactType } from '../../types/types';

type SliceState = {
  contacts: ContactType[];
};
const initialState: SliceState = {
  contacts: [
    {
      id: 2,
      name: 'Alex',
      phone: '131',
    },
    {
      id: 3,
      name: 'Tom',
      phone: '131',
    },
    {
      id: 4,
      name: 'Tim',
      phone: '131',
    },
  ],
};
const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getContacts(state, action: PayloadAction<boolean>) {},
  },
});

export const contactsReducer = slice.reducer;
export const { getContacts } = slice.actions;

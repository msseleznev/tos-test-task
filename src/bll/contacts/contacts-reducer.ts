import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  contacts: any;
};
const initialState: SliceState = {
  contacts: [],
};
const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContacts(state, action: PayloadAction<boolean>) {
      state.contacts = action.payload;
    },
  },
});

export const contactsReducer = slice.reducer;
export const { getContacts } = slice.actions;

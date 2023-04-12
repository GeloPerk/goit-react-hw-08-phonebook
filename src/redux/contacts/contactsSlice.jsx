import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    setContactsList: (state, action) => {
      state.contacts = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setContactsList, setFilter } = contactsSlice.actions;

export const selectContacts = state => state.contacts.contacts;
export const selectFilter = state => state.contacts.filter;

export const fetchContacts = () => async dispatch => {
  try {
    const { data } = await axios.get('/contacts');
    dispatch(setContactsList(data));
  } catch (error) {
    console.error(error);
  }
};

export default contactsSlice.reducer;
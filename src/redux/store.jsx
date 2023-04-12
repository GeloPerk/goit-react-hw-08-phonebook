import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts';
import authReducer from '../auth/slice/usersSlice'

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
  },
});

export default store;
import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/api';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: { 
    name: "artanis porfawor",
    email: "artes@mail.com"},
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2NzNkMjM1NjQ3ZTAwMTQyMzFiYzMiLCJpYXQiOjE2ODEyOTAxOTR9.xyYtkGNYV9h12qwWzAz0ouypdqcUDXb9NXY2Bvq0",
    loading: false,
      error: null,
  },
  reducers: {
    registrationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = usersSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registrationRequest());
    const response = await api.post('/users', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    dispatch(registrationSuccess(user));
  } catch (error) {
    dispatch(registrationFailure(error.message));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await api.post('/auth', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const response = await api.put(`/users/${userData.id}`, userData);
    const { user } = response.data;
    dispatch(updateUserSuccess(user));
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

export const selectCurrentUser = (state) => state.users.currentUser;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;

export default usersSlice.reducer;
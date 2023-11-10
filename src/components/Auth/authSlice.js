import { createSlice } from "@reduxjs/toolkit"
import api from '../../store/api'

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ firstname, lastname, email, password }) => ({
        url: '/users/register',
        method: 'POST',
        body: { firstname, lastname, email, password },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

/** Session storage key */
const TOKEN_KEY = 'token';

/** Stores the payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      window.sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  }
});

export const { logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;


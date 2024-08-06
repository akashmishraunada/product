import { createSlice } from '@reduxjs/toolkit';

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        loading: false,
        isAuthenticated: false,
        message: null,
        error: null,
        user: null,
    },
    reducers: {
        USER_LOGIN_REQUEST: (state) => {
            state.loading = true;
        },
        USER_LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        USER_LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        USER_LOGOUT_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        USER_LOGOUT_SUCCESS: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = null;
            state.error = null;
        },
        USER_LOGOUT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
    },
});

export const {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    CLEAR_ERROR
} = userLoginSlice.actions;

export default userLoginSlice.reducer;

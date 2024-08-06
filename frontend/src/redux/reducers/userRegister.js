import { createSlice } from '@reduxjs/toolkit';

const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState: {
        loading: false,
        isAuthenticated: false,
        message: null,
        error: null,
        user: null,
    },
    reducers: {
        USER_REGISTER_REQUEST: (state) => {
            state.loading = true;
        },
        USER_REGISTER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        USER_REGISTER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
    },
});

export const {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    CLEAR_ERROR
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer;

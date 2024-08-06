import { createSlice } from '@reduxjs/toolkit';

const adminRegisterSlice = createSlice({
    name: 'adminRegister',
    initialState: {
        loading: false,
        isAuthenticated: false,
        message: null,
        error: null,
        user: null,
    },
    reducers: {
        ADMIN_REGISTER_REQUEST: (state) => {
            state.loading = true;
        },
        ADMIN_REGISTER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        ADMIN_REGISTER_FAIL: (state, action) => {
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
    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL,
    CLEAR_ERROR
} = adminRegisterSlice.actions;

export default adminRegisterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const MyProfileSlice = createSlice({
    name: 'MyProfile',
    initialState: {
        loading: false,
        isAuthenticated: false,
        message: null,
        error: null,
        user: null,
    },
    reducers: {
        MY_PROFILE_REQUEST: (state) => {
            state.loading = true;
        },
        MY_PROFILE_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },
        MY_PROFILE_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
        CLEAR_Message: (state) => {
            state.message = null;
        },
    }
});

export const { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL, CLEAR_ERROR } = MyProfileSlice.actions;

export default MyProfileSlice.reducer;


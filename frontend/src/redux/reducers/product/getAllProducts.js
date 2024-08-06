import { createSlice } from '@reduxjs/toolkit';

export const GetAllProductsSlice = createSlice({
    name: 'Products',
    initialState: {
        loading: false,
        error: null,
        Products: []
    },
    reducers: {
        GET_PRODUCTS_REQUEST: (state) => {
            state.loading = true;
        },
        GET_PRODUCTS_SUCCESS: (state, action) => {
            state.loading = false;
            state.Products = action.payload;
        },
        GET_PRODUCTS_FAIL: (state, action) => {
            state.loading = false;
            state.Products = action.payload;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
    }
});

export const { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL, CLEAR_ERROR } = GetAllProductsSlice.actions;

export default GetAllProductsSlice.reducer;


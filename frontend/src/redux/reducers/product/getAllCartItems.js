import { createSlice } from '@reduxjs/toolkit';

export const GetAllCartItemsSlice = createSlice({
    name: 'CartItems',
    initialState: {
        loading: false,
        error: null,
        CartItems: []
    },
    reducers: {
        GET_CART_ITEM_REQUEST: (state) => {
            state.loading = true;
        },
        GET_CART_ITEM_SUCCESS: (state, action) => {
            state.loading = false;
            state.CartItems = action.payload;
        },
        GET_CART_ITEM_FAIL: (state, action) => {
            state.loading = false;
            state.CartItems = action.payload;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
    }
});

export const { GET_CART_ITEM_REQUEST, GET_CART_ITEM_SUCCESS, GET_CART_ITEM_FAIL, CLEAR_ERROR } = GetAllCartItemsSlice.actions;

export default GetAllCartItemsSlice.reducer;


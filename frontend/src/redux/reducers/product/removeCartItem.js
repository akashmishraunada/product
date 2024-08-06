import { createSlice } from '@reduxjs/toolkit';

export const RemoveCartItemSlice = createSlice({
    name: 'RemoveCartItem',
    initialState: {
        loading: false,
        error: null,
        RemoveItem: []
    },
    reducers: {
        REMOVE_CART_ITEM_REQUEST: (state) => {
            state.loading = true;
        },
        REMOVE_CART_ITEM_SUCCESS: (state, action) => {
            state.loading = false;
            state.RemoveItem = action.payload;
        },
        REMOVE_CART_ITEM_FAIL: (state, action) => {
            state.loading = false;
            state.RemoveItem = action.payload;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
    }
});

export const { REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAIL, CLEAR_ERROR } = RemoveCartItemSlice.actions;

export default RemoveCartItemSlice.reducer;


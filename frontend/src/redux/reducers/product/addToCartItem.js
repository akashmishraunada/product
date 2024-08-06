import { createSlice } from '@reduxjs/toolkit';

const AddCartItemSlice = createSlice({
    name: 'AddCartItem',
    initialState: {
        loading: false,
        addCartItem: {},
        error: null
    },
    reducers: {
        ADD_CART_ITEM_REQUEST: (state) => {
            state.loading = true;
        },
        ADD_CART_ITEM_SUCCESS: (state, action) => {
            state.loading = false;
            state.addCartItem = action.payload;
        },
        ADD_CART_ITEM_FAIL: (state, action) => {
            state.loading = false;
            state.addCartItem = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
    },
});

export const {
    ADD_CART_ITEM_REQUEST,
    ADD_CART_ITEM_SUCCESS,
    ADD_CART_ITEM_FAIL,
    CLEAR_ERROR
} = AddCartItemSlice.actions;

export default AddCartItemSlice.reducer;

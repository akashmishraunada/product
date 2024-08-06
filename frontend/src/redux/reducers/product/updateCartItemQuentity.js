import { createSlice } from '@reduxjs/toolkit';

const updateCartItemQuantitySlice = createSlice({
    name: 'updateCartItem',
    initialState: {
        loading: false,
        cartItems: [],
        error: null
    },
    reducers: {
        UPDATE_CART_ITEM_REQUEST: (state) => {
            state.loading = true;
        },
        UPDATE_CART_ITEM_SUCCESS: (state, action) => {
            state.loading = false;
            const { _id, quantity } = action.payload;
            state.cartItems = state.cartItems.map(item =>
                item._id === _id ? { ...item, quantity } : item
            );
        },
        UPDATE_CART_ITEM_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
        SET_CART_ITEMS: (state, action) => {
            state.cartItems = action.payload;
        },
    },
});

export const {
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAIL,
    CLEAR_ERROR,
    SET_CART_ITEMS
} = updateCartItemQuantitySlice.actions;

export default updateCartItemQuantitySlice.reducer;

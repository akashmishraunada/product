import { createSlice } from '@reduxjs/toolkit';

export const RemoveAllCartItemSlice = createSlice({
    name: 'RemoveAllCartItem',
    initialState: {
        loading: false,
        error: null,
        RemoveAllItem: []
    },
    reducers: {
        REMOVE_ALLCART_ITEM_REQUEST: (state) => {
            state.loading = true;
        },
        REMOVE_ALLCART_ITEM_SUCCESS: (state, action) => {
            state.loading = false;
            state.RemoveAllItem = action.payload;
        },
        REMOVE_ALLCART_ITEM_FAIL: (state, action) => {
            state.loading = false;
            state.RemoveAllItem = action.payload;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
    }
});

export const { REMOVE_ALLCART_ITEM_REQUEST, REMOVE_ALLCART_ITEM_SUCCESS, REMOVE_ALLCART_ITEM_FAIL, CLEAR_ERROR } = RemoveAllCartItemSlice.actions;

export default RemoveAllCartItemSlice.reducer;


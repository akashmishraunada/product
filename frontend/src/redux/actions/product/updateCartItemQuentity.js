import axios from 'axios';
import { server } from '../../store';
import {
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAIL,
} from "../../reducers/product/updateCartItemQuentity";
import { GetCartItems } from './getAllCartItems';

export const updateCartItem = (cartId, quantity) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        const response = await axios.put(`${server}/update-cart-item`, { cartId, quantity }, config);

        dispatch({
            type: UPDATE_CART_ITEM_SUCCESS,
            payload: response.data,
        });

        // Optionally fetch the cart items again to ensure consistency
        dispatch(GetCartItems());
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update cart item';
        dispatch({
            type: UPDATE_CART_ITEM_FAIL,
            payload: errorMessage,
        });
    }
};

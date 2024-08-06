import axios from 'axios';
import { server } from '../../store';
import { REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAIL } from "../../reducers/product/removeCartItem";

export const RemoveCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        const response = await axios.delete(`${server}/delete-cart-item/${cartItemId}`, config);

        dispatch({
            type: REMOVE_CART_ITEM_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to remove cart item';
        dispatch({
            type: REMOVE_CART_ITEM_FAIL,
            payload: errorMessage,
        });
    }
};

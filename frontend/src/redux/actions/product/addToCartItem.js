import axios from 'axios';
import { server } from '../../store';
import { ADD_CART_ITEM_REQUEST, ADD_CART_ITEM_SUCCESS, ADD_CART_ITEM_FAIL } from "../../reducers/product/addToCartItem";

export const AddToCartItem = (productId, quantity) => async (dispatch) => {
    dispatch({ type: ADD_CART_ITEM_REQUEST });

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        
        const response = await axios.post(`${server}/add-to-cart`, { productId, quantity }, config);

        dispatch({
            type: ADD_CART_ITEM_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update cart item';
        dispatch({
            type: ADD_CART_ITEM_FAIL,
            payload: errorMessage,
        });
    }
};

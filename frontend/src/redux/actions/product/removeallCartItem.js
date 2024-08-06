import axios from 'axios';
import { server } from '../../store';
import { REMOVE_ALLCART_ITEM_REQUEST, REMOVE_ALLCART_ITEM_SUCCESS, REMOVE_ALLCART_ITEM_FAIL } from "../../reducers/product/removeallCartItem";

export const RemoveAllCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_ALLCART_ITEM_REQUEST });

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        const response = await axios.delete(`${server}/delete-allcart-item`, config);

        dispatch({
            type: REMOVE_ALLCART_ITEM_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to all remove cart item';
        dispatch({
            type: REMOVE_ALLCART_ITEM_FAIL,
            payload: errorMessage,
        });
    }
};

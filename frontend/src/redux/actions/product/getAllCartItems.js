import axios from "axios";
import { server } from '../../store';
import { GET_CART_ITEM_REQUEST, GET_CART_ITEM_SUCCESS, GET_CART_ITEM_FAIL } from "../../reducers/product/getAllCartItems";

export const GetCartItems = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CART_ITEM_REQUEST.toString() });

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
            withCredentials: true,
        };
        const link = `${server}/get-cart-item`;

        const { data } = await axios.get(link, config);

        dispatch({
            type: GET_CART_ITEM_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_CART_ITEM_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

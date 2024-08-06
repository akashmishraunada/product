import axios from "axios";
import { server } from '../../store';
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } from "../../reducers/product/getAllProducts";

export const GetProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST.toString() });

        const config = { headers: { "Content-Type": "application/json" } };
        const link = `${server}/all-products`;

        const { data } = await axios.get(link, config);        

        dispatch({
            type: GET_PRODUCTS_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

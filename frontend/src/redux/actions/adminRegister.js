import axios from 'axios';
import { server } from '../store';
import { ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, ADMIN_REGISTER_FAIL, CLEAR_ERROR } from "../reducers/adminRegister";

export const CreateAdmin = (name, email, password, mobileNumber) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_ERROR.toString() });
        dispatch({ type: ADMIN_REGISTER_REQUEST.toString() });

        const config = {
            headers: {
                'Content-type': 'application/json',
                withCredentials: true,
            }
        };
        const link = `${server}/admin-register`;
        const { data } = await axios.post(link, { name, email, password, mobileNumber }, config);

        dispatch({
            type: ADMIN_REGISTER_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_REGISTER_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

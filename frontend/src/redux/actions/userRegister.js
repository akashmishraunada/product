import axios from 'axios';
import { server } from '../store';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, CLEAR_ERROR } from "../reducers/userRegister";

export const CreateUser = (name, email, password, mobileNumber) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_ERROR.toString() });
        dispatch({ type: USER_REGISTER_REQUEST.toString() });

        const config = {
            headers: {
                'Content-type': 'application/json',
                withCredentials: true,
            }
        };
        const link = `${server}/user-register`;
        const { data } = await axios.post(link, { name, email, password, mobileNumber }, config);

        dispatch({
            type: USER_REGISTER_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

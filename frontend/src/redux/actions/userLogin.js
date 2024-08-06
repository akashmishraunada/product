import axios from 'axios';
import { server } from '../store';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL, CLEAR_ERROR } from "../reducers/userLogin";

export const LoginUser = (email, password, flag) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_ERROR.toString() });
        dispatch({ type: USER_LOGIN_REQUEST.toString() });

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
            withCredentials: true,
        };
        const link = `${server}/user-login`;
        const { data } = await axios.post(link, { email, password, flag }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

export const LogoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_ERROR.toString() });
        dispatch({ type: USER_LOGOUT_REQUEST.toString() });

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
            withCredentials: true,
        };
        const link = `${server}/user-logout`;
        const { data } = await axios.get(link, config);

        dispatch({
            type: USER_LOGOUT_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

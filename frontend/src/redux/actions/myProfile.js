import axios from "axios";
import { server } from '../store';
import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL } from "../reducers/myProfile";

export const GetMyProfile = () => async (dispatch) => {
    try {
        dispatch({ type: MY_PROFILE_REQUEST.toString() });

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
            withCredentials: true,
        };
        const link = `${server}/user-me`;

        const { data } = await axios.get(link, config);

        dispatch({
            type: MY_PROFILE_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MY_PROFILE_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};

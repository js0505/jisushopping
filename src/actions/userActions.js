//유저인증 관련 api

import axios from "axios";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_REQUEST,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});
        //로그인 데이터
        const { data } = await axios.get("/api/users/login", { email, password });
        //성공시
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
	} catch (e) {
		dispatch({
			//로그인 실패시
			type: USER_LOGIN_FAIL,
			//받는 데이터
			payload:
				e.response && e.response.data.response
					? e.response.data.message
					: e.message,
		});
	}
};

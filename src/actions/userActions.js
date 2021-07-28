//유저인증 관련 api

import axios from "axios";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_REQUEST,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const { data } = await axios.post("/api/users/login", {
			email,
			password,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("token", data.token);
		localStorage.setItem("name", data.name);
	} catch (e) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});
		const { data } = await axios.post("/api/users", {
			name,
			email,
			password,
		});
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				e.response && e.response.data.response
					? e.response.data.message
					: e.message,
		});
	}
};

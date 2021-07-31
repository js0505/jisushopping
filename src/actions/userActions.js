import axios from "axios";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_REQUEST,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_FAIL,
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
		localStorage.setItem("userInfo", JSON.stringify(data));
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

export const logout = () => (dispatch) => {
	dispatch({
		type: USER_LOGOUT,
	});
	localStorage.removeItem("userInfo");
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

export const profile = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_PROFILE_REQUEST,
		});
		// const token = JSON.parse(localStorage.getItem("userInfo")).token;
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(
			"http://localhost:5000/api/users/profile",
			config
		);

		dispatch({
			type: USER_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: USER_PROFILE_FAIL,
			payload:
				e.response && e.response.data.response
					? e.response.data.message
					: e.message,
		});
	}
};

export const updateProfile =
	(name, email, password) => async (dispatch, getState) => {
		try {
			dispatch({
				type: PROFILE_UPDATE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const updateUser = {
				name,
				email,
				password,
			};
			const { data } = await axios.put(
				"http://localhost:5000/api/users/profile",
				updateUser,
				config
			);

			dispatch({
				type: PROFILE_UPDATE_SUCCESS,
				payload: data,
			});
			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (e) {
			dispatch({
				type: PROFILE_UPDATE_FAIL,
				payload:
					e.response && e.response.data.response
						? e.response.data.message
						: e.message,
			});
		}
	};

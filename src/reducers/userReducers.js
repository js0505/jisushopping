import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
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

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, success: true };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userProfileReducer = (state = { userProfile: {} }, action) => {
	switch (action.type) {
		case USER_PROFILE_REQUEST:
			return { loading: true, ...state };
		case USER_PROFILE_SUCCESS:
			return { loading: false, userProfile: action.payload };
		case USER_PROFILE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const updateProfileReducer = (state = { updateUserData: {} },action) => {
	switch (action.type) {
		case PROFILE_UPDATE_REQUEST:
			return { loading: true, updateUserData: {} };
		case PROFILE_UPDATE_SUCCESS:
			return { loading: false, updateUserData: action.payload };
		case PROFILE_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

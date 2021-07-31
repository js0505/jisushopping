import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	updateProfileReducer,
	userLoginReducer,
	userProfileReducer,
	userRegisterReducer,
} from "./reducers/userReducers";
import {
	detailProductReducer,
	listProductReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

//여러 reducer를 결합하는 메서드.
//useSelector 에서 접근하는 부분.
const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	listProducts: listProductReducer,
	detailProduct: detailProductReducer,
	getUserProfile: userProfileReducer,
	updateUserProfile: updateProfileReducer,
	cart: cartReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const cartItemFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	cart: {
		cartItems: cartItemFromStorage,
	},
};

//redux-thunk : 비동기 작업을 처리, 관리 하기위해 쓰이는 미들웨어.
const middleware = [thunk];

//스토어 생성
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

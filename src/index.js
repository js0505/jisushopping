import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>,

	//store 연동
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

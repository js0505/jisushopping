import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FormContainer, Message, Loading } from "../Components";
import { Link, useHistory, useLocation } from "react-router-dom";

import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const location = useLocation();
	const redirect = location.search ? location.search.split("=")[1] : "/profile";
	const onSubmit = (e) => {
		e.preventDefault();

		if (email === "" || password === "") {
			setMessage("Check Empty Field");
			return;
		}

		dispatch(login(email, password));
	};

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [userInfo, history, redirect]);

	return (
		<FormContainer>
			<h1>Log in</h1>
			{loading && <Loading />}
			{error && <Message variant={"danger"}>{error}</Message>}
			{message && <Message variant={"danger"}>{message}</Message>}
			<Form onSubmit={onSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Sign in
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer? <Link to={"/signup"}>Sign Up</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;

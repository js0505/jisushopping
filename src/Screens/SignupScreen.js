import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FormContainer, Loading, Message } from "../Components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const SignupScreen = () => {
	const history = useHistory();

	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error } = userRegister;

	const onSubmit = (e) => {
		e.preventDefault();

		if (username === "" || email === "" || password === "") {
			setMessage("Check Empty Field");
		}

		if (password !== confirmPassword) {
			setMessage("Password Mismatch!");
		}

		// setLoading(true);
		//서버로 보낼 데이터 정리

		dispatch(register(username, email, password));
		history.push("/login");
	};

	return (
		<FormContainer>
			<h1>Sign up</h1>
			{loading && <Loading />}
			{message && <Message variant={"danger"}>{message}</Message>}
			{error && <Message variant={"danger"}>{error}</Message>}
			<Form onSubmit={onSubmit}>
				<Form.Group controlId="name">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Username"
						value={username}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
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
				<Form.Group controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Sign Up
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Already Have an Account? <Link to={"/login"}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default SignupScreen;

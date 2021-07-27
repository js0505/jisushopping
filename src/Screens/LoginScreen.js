import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FormContainer, Message, Loading } from "../Components";
import { Link } from "react-router-dom";

//Redux
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
	// const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	//폼 이벤트에서 보낸 action을 참조하는 reducer에서 state를 가지고오기.
	const userLogin = useSelector((state) => state.userLogin);

	//둘중 하나가 변경되면 다 재 랜더링 됨.
	//성능 최적화를 생각해야 한다면 필요한 부분만 가져와도 가능.
	const { loading, error } = userLogin;

	const onSubmit = async (e) => {
		e.preventDefault();

		if (email === "" || password === "") {
			setMessage("Check Empty Field");
		}
		//폼 데이터를 login action에 담아서 dispatch
		dispatch(login(email, password));
	};

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

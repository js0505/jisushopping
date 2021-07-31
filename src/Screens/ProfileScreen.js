import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { Loading, Message } from "../Components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile, updateProfile } from "../actions/userActions";

const ProfileScreen = () => {
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const getUserProfile = useSelector((state) => state.getUserProfile);
	const { loading, error, userProfile } = getUserProfile;


	const profileUpdate = useSelector((state) => state.updateUserProfile);
	const { updateUserData } = profileUpdate;

	useEffect(() => {
		// dispatch(profile("profile"));
		// setName(userProfile.name);
		// setEmail(userProfile.email);
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!userProfile.name) {
				dispatch(profile());
			} else {
				setName(userProfile.name);
				setEmail(userProfile.email);
			}
		}
	}, [dispatch, userProfile, userInfo, history]);

	// console.log(userProfile);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (name === "" || email === "" || password === "") {
			setMessage("Check Empty Field");
			return;
		}

		if (password !== confirmPassword) {
			setMessage("Password Mismatch!");
			return;
		}

		// dispatch(updateProfile(name, email, password));

		// setName(updateUserData.name);
		// setEmail(updateUserData.email);
		// setPassword("");
		// setConfirmPassword("");

		// setMessage("Update Success!");
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User profile</h2>
				{loading && <Loading />}
				{error && <Message variant={"danger"}>{error}</Message>}
				{message && <Message variant={"info"}>{message}</Message>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>email</Form.Label>
						<Form.Control
							type="email"
							placeholder="enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>password</Form.Label>
						<Form.Control
							type="password"
							placeholder="enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="confirmPassword">
						<Form.Label>confirm password</Form.Label>
						<Form.Control
							type="password"
							placeholder="confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>my orders</h2>
				<Table striped borderd hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th></th>
						</tr>
					</thead>
					<tbody></tbody>
				</Table>
			</Col>
		</Row>
	);
};

export default ProfileScreen;

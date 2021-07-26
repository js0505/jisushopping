import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { Loading, Message } from "../Components";
import { useHistory } from "react-router-dom";

const ProfileScreen = () => {
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const getProfile = async () => {
			const token = localStorage.getItem("token");
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			await axios
				.get("http://localhost:5000/api/users/profile", { headers })
				.then((res) => {
					setName(res.data.name);
					setEmail(res.data.email);
				})
				.catch((e) => console.log(e));
		};
		getProfile();
	}, []);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (name === "" || email === "" || password === "") {
			setMessage("Check Empty Field");
			setShow(true);
			setLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setMessage("Password Mismatch!");
			setShow(true);
			setLoading(false);
			return;
		}

		const updateUser = {
			name,
			email,
			password,
		};
		const token = localStorage.getItem("token");
		const headers = {
			Authorization: `Bearer ${token}`,
		};

		axios
			.put("http://localhost:5000/api/users/profile", updateUser, { headers })
			.then((res) => {
				localStorage.setItem("name", res.data.name);

				// form value 변경
				setName(res.data.name);
				setEmail(res.data.email);
				setPassword("");
				setConfirmPassword("");
				// form value 변경 끝

				setMessage("Update Success!");
				setShow(true);
				setLoading(false);
				history.push("/profile");
				// window.location.replace("/profile");
			})
			.catch((e) => console.log(e));
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User profile</h2>
				{loading && <Loading />}
				{message && show && <Message variant={"info"}>{message}</Message>}
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

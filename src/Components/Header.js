import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const username = "none";

	//토큰 값이 로컬스토리지에 있으면 로그인 상태로 변경.
	// const loginCheck = () => {
	// 	const token = localStorage.key("token");
	// 	if (token) {
	// 		setIsLoggedIn(true);
	// 	}
	// };

	//로그아웃 누르면 로컬스토리지 값 삭제하고 루트로 push
	const onLogoutHandler = (e) => {
		dispatch(logout());
	};

	useEffect(() => {
		// loginCheck();
	}, []);

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand href="/">JisuShop</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link href="/cart">
									<i className="fas fa-shopping-cart" /> Cart
								</Nav.Link>
							</LinkContainer>
							{/* 로그인 상태에 따라서 메뉴변경 */}
							{userInfo ? (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={onLogoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link href="/login">
										<i className="fas fa-user" /> Login
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;

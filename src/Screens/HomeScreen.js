import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Product, Loading, Message } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.listProducts);
	const { loading, products, error } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h1>Lastest Products</h1>
			{loading && <Loading />}
			{error && <Message variant={"danger"}>{error}</Message>}
			{products.length === 0 ? (
				<h2>등록된 제품이 없습니다</h2>
			) : (
				<Row>
					{products.map((item) => (
						<Col key={item._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={item} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;


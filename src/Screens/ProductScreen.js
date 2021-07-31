import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Rating, Loading, Message } from "../Components";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../actions/productActions";

const ProductScreen = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	const admin = localStorage.getItem("name");
	const history = useHistory();

	const checkDeleteProduct = () => {
		const question = window.confirm("Delete Product?");
		if (question) {
			history.push(`/productDelete/${id}`);
		}
	};
	const dispatch = useDispatch();
	const productDetail = useSelector((state) => state.detailProduct);
	const { loading, error, product } = productDetail;
	const { id } = useParams();

	useEffect(() => {
		if (admin === "jisuAdmin") {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}

		dispatch(detailProduct(id));
	}, [admin, dispatch, id]);

	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go Back
			</Link>
			{loading && <Loading />}
			{error && <Message variant={"danger"}>{error}</Message>}
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
								color={"red"}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price : ${product.price}</ListGroup.Item>
						<ListGroup.Item>Description : {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									Add To Cart
								</Button>
								{isAdmin ? (
									<>
										<LinkContainer to={`/productUpdate/${id}`}>
											<Button className="btn-block" type="button">
												Update
											</Button>
										</LinkContainer>
										<Button
											className="btn-block"
											type="button"
											onClick={checkDeleteProduct}
										>
											Delete
										</Button>
									</>
								) : (
									<></>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;

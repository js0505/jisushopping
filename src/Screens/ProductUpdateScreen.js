import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Loading } from "../Components";

const ProductUpdateScreen = () => {
	const { id } = useParams();
	const history = useHistory();

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("/");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getProduct = async () => {
			await axios
				.get(`http://localhost:5000/api/products/${id}`)
				.then((res) => {
					setName(res.data.name);
					setPrice(res.data.price);
					setDescription(res.data.description);
					setImage(res.data.image);
					setBrand(res.data.brand);
					setCategory(res.data.category);
					setCountInStock(res.data.countInStock);
				})
				.catch((e) => console.log(e));
		};

		getProduct();
	}, [id]);

	const updateProductHandler = (e) => {
		e.preventDefault();
		setLoading(true);

		const token = localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const updateProduct = {
			name,
			price,
			description,
			image,
			brand,
			category,
			countInStock,
		};

		axios
			.put(`http://localhost:5000/api/products/${id}`, updateProduct, config)
			.then((res) => {
				setLoading(false);
				history.push(`/product/${id}`);
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<Form onSubmit={updateProductHandler}>
				{loading && <Loading />}
				<h1>Update Product</h1>
				<Row>
					<Col md={6}>
						<Form.Group className="" controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Product name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="" controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="Product description"
								value={description}
								style={{ height: "40vh" }}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group className="" controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="text"
								placeholder="Product price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="" controlId="image">
							<Form.Label>Image Src</Form.Label>
							<Form.Control
								type="text"
								placeholder="Product image src"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="" controlId="brand">
							<Form.Label>brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Product brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="" controlId="category">
							<Form.Label>category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Product category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="" controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="text"
								placeholder="Product Count In Stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Button type="submit" variant="primary">
					Update
				</Button>
			</Form>
		</>
	);
};

export default ProductUpdateScreen;

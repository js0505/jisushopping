import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../Components'

const ProductCreateScreen = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('/');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const [loading, setLoading] = useState(false);

    const createProductHandler = (e) => {
        e.preventDefault()
        setLoading(true)

        
        const user = localStorage.getItem('id')
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const createProduct = {
            name,
            user,
            price,
            description,
            image,
            brand,
            category,
            countInStock
        }

        axios
            .post(`http://localhost:5000/api/products/`, createProduct, { headers })
            .then(res => {
                setLoading(false)
                history.push(`/product/${res.data._id}`)
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <Form onSubmit={createProductHandler}>
                {loading && <Loading />}
                <h1>Create Product</h1>
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
                                style={{ height: '40vh' }}
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
                <Button type='submit' variant='primary'>
                    Create
                </Button>
            </Form>
        </>
    );
};

export default ProductCreateScreen;
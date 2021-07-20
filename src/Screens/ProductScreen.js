import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Rating, Loading } from '../Components'
import axios from 'axios';

const ProductScreen = () => {

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    
    const { id } = useParams();

    const getProduct = useCallback(async () => {
        await axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then(res => {
                setProduct(res.data)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }, [id])


    useEffect(() => {
        getProduct()
    },[product, getProduct])

    return (
        <>
            <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>
            {loading && <Loading />}
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                                color={'red'}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
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
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
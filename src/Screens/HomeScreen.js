import React from 'react';
import products from '../Products'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product';


const HomeScreen = () => {
    return (
        <>
            <h1>Lastest Products</h1>
            <Row>
                {products.map(item => (
                    <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={item} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
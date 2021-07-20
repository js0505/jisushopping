import React, {useEffect, useState} from 'react';
import { Row, Col } from 'react-bootstrap'
import { Product, Loading } from '../Components'
import axios from 'axios';


const HomeScreen = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {

        await axios
            .get('http://localhost:5000/api/products')
            .then(res => {
                setProducts(res.data.products)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <>
            <h1>Lastest Products</h1>
            {loading && <Loading />}
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
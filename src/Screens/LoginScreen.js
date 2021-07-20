import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FormContainer, Message, Loading } from '../Components'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';


const LoginScreen = () => {
    
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [show, setShow] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()

        if (email === "" || password === "") {
            setMessage('Check Empty Field')
            setShow(true)
        }
        setLoading(true)

        //서버에 보내야 할 데이터 정리
        const loginUser = {
            email,
            password
        }
        // router.post('/login', authUser) 
        // await axios
        //     .post('http://localhost:5000/api/users/login', loginUser)
        //     .then(res => {
        //         setLoading(false)
        //     })
        //     .catch(e => console.log(e))
        
        
        //다른 방법
        const { data } = await axios.post('http://localhost:5000/api/users/login', loginUser)

        localStorage.setItem('token', data.token)
        history.push('/profile')
        setLoading(false)
    }

    return (
        <FormContainer>
            <h1>Log in</h1>
            {loading && <Loading />}
            {message && show && <Message setShow={setShow} variant={'danger'}>{message}</Message>}
            <Form onSubmit={onSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign in
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={'/signup'}>
                        Sign Up
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
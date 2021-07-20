import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FormContainer, Message } from '../Components'
import { Link } from 'react-router-dom'
import axios from 'axios';

const SignupScreen = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [show, setShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        if (username === "" || email === "" || password === "") {
            setMessage('Check Empty Field')
            setShow(true)
        }
        
        if (password !== confirmPassword) {
            setMessage('Password Mismatch!')
            setShow(true)
        }

        //서버로 보낼 데이터 정리
        const newUser = {
            name: username,
            email,
            password
        }


        // router.route('/')
        //     .post(registerUser)
        axios
            .post('http://localhost:5000/api/users', newUser)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))


    }

    return (
        <FormContainer>
            <h1>Sign up</h1>
            {message && show && <Message variant={'danger'} setShow={setShow}>{message}</Message>}
            <Form onSubmit={onSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
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
                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign Up
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already Have an Account?{' '}
                    <Link to={'/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default SignupScreen;
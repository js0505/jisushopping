import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, Table } from 'react-bootstrap'

const ProfileScreen = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    

    useEffect(() => {
        const getProfile = async () => {
        const token = localStorage.getItem('token');
        
        const config = {
            Authorization: 'Bearer '+ token
        }


        await axios
            .get('http://localhost:5000/api/users/profile', {}, config)
            .then(res => console.log(res))
            .catch(e => console.log(e))

        }
        getProfile()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();

    }


    return (
        <Row>
            <Col md={3}>
                <h2>User profile</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='enter name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='enter email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>confirm password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='confirm password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                    >
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>my orders</h2>
                <Table striped borderd hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
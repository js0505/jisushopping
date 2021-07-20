import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileScreen = () => {


    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');

    // const getProfile = async () => {
    //     const token = localStorage.getItem('token');
    //     const config = {
    //         Authorization: `Bearer ${token}`
    //     }


    //     await axios
    //         .get('http://localhost:5000/api/users/profile', config)
    //         .then(res => console.log(res.data))
    //         .catch(e => console.log(e))

    // }

    // useEffect(() => {
    //     getProfile()
    // }, [name, email])

    return (
        <div>
            <h1>Profile</h1>
            
        </div>
    );
};

export default ProfileScreen;
import React, { useEffect } from 'react';
import axios from 'axios';


const UploadProductScreen = () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjYyNGE4Nzg0ZGNlNWVlNTk3YTM3MiIsImlhdCI6MTYyNjc4Njk3MSwiZXhwIjoxNjI5Mzc4OTcxfQ.dFDF5RIAAh7yll7Yw29DH5eLd1Zhr1rcoc4bMmFmxWs';
    
    // const postProduct = async () => {
    //     const data = {
    //         name: '0390002435',
    //         user: '60f624a8784dce5ee597a372',
    //         price: 310.99,
    //         description: 'wowwwwwwww',
    //         image: '/',
    //         brand: 'Sonu',
    //         category: 'electronic',
    //         countInStock: 3,
    //     };
    //     const headers = { 
    //         'Authorization': `Bearer ${token}`
    //     };
    //     await axios.post('http://localhost:5000/api/products', data, {headers})
    //         .then(res => console.log(res))
    //         .catch(e => console.log(e))
    // }

            // 데이터 생성
    // const postProduct = async () => {
    //     const data = {
    //         name: '0390002435',
    //         user: '60f624a8784dce5ee597a372',
    //         price: 310.99,
    //         description: 'wowwwwwwww',
    //         image: '/',
    //         brand: 'Sonu',
    //         category: 'electronic',
    //         countInStock: 3,
    //     };
    //     const headers = { 
    //         'Authorization': `Bearer ${token}`
    //     };
    //     await axios.post('http://localhost:5000/api/products', data, {headers})
    //         .then(res => console.log(res))
    //         .catch(e => console.log(e))
    // }

            // 데이터 수정
    // const postProduct = async () => {
    //     const data = {
    //         name: 'testtttt',
    //         price: 310.99,
    //         description: 'wowwwwwwww',
    //         image: '/',
    //         brand: 'Sonu',
    //         category: 'electronic',
    //         countInStock: 3,
    //     };
    //     const headers = { 
    //         'Authorization': `Bearer ${token}`
    //     };
    //     await axios.put('http://localhost:5000/api/products/60f63b25437f0c6f78e82a17', data, {headers})
    //         .then(res => console.log(res))
    //         .catch(e => console.log(e))
    // }

    

    // useEffect(() => {
    //     postProduct()
    // },[])

    return (
        <div>
            
        </div>
    );
};

export default UploadProductScreen;




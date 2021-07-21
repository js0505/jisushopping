import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const DeleteProduct = () => {


    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {

        const deleteProduct = async () => {

            const token = localStorage.getItem('token')
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            await axios
                .delete(`http://localhost:5000/api/products/${id}`, { headers })
                .then(res => {
                    history.push('/')
                })
                .catch(e => console.log(e))
        }

        deleteProduct()
    }, [history, id])
    

    return (
        <div>
            
        </div>
    );
};

export default DeleteProduct;
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import API from '../Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [inputData, setInputData] = useState({ name: '', rating: '', price: '', image: '' })
    const navigate = useNavigate();

    function handleSubmit() {
        console.log(inputData)
        axios.post(`${API}/products`, inputData)
            .then(res => {
                alert("Product added successfully");
                navigate('/');
            }).catch(() => {
                alert("Something went wrong")
            })
    }

    return (
        <Container>
            <h1>Add New Product</h1>
            <form encType="multipart/form-data">
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
                <div className='w-50 border bg-light p-5'>
                    <div>
                        <label htmlFor="name"> Name :</label>
                        <input type="text" placeholder="tea Pot" className="form-control"
                            onChange={e => setInputData({ ...inputData, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="title"> Rating:</label>
                        <input type="text" placeholder="rating" className="form-control"
                            onChange={e => setInputData({ ...inputData, rating: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="title"> Price:</label>
                        <input type="text" placeholder="product price" className="form-control"
                            onChange={e => setInputData({ ...inputData, price: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="title"> Image: </label>
                        <input type="text" placeholder="select image" className="form-control"
                            onChange={e => setInputData({ ...inputData, image: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button className="btn btn-info" onClick={() => handleSubmit()}>Submit</button>
                        <a className="btn btn-info" href="/">Cancel</a>
                    </div>
                </div>
            </div>
            </form>
        </Container>
    );
};

export default AddProduct;

import axios from 'axios';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [products, setProducts] = useState([]);

    const onSubmit = data => {
        const productData = {
            img: imageURL,
            productName: data.productName,
            productType: data.productType,
            productPrice: data.productPrice
        };
        const url = `http://localhost:5000/addProduct`;
        console.log(productData);

        fetch(url,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res => {
            alert("product successfully added");
            setProducts(products);
            console.log(products);
        })
    }
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '2ab4e9918f6e76ee1d27375bb1587084');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
        .then(function (response) {
            console.log(response.data.data.display_url);
            setImageURL(response.data.data.display_url);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col>
                <Form.Label>Product Name</Form.Label>
                <Form.Control className="" type="productName" {...register("productName")} />
                </Col>
                <Col>
                <Form.Label>Product Type</Form.Label>
                <Form.Control type="productType" {...register("productType")} />
                </Col>
            </Row>
                <br/>
            <Row>
                <Col>
                <Form.Label>Product Price</Form.Label>
                <Form.Control type="productPrice" {...register("productPrice")} />
                </Col>
                <Col>
                <Form.Label>Choose Image</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload}/>
                </Col>
            </Row>
                <br/>
                
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;
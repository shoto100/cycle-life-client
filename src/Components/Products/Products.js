
import { Button } from 'react-bootstrap';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Products.css'

const Products = (props) => {
    console.log(props.product);
    const {productName, productPrice, img, _id} = props.product;
    return (
        <div className="col-md-4" style={{marginBottom: "25px"}}>
            <Card style={{ width: '22rem', textAlign: 'center'}}>
              <Card.Img className="products-img" variant="top" src={img} />
              <Card.Body className="custom-card-body">
                <Card.Title>{productName}</Card.Title>
                <Card.Text>{productPrice}</Card.Text>
                <Button className="link1" variant="primary">
                  <Link className="link1" to={`/cart/${_id}`}>Buy Now</Link>
                </Button>
              </Card.Body>
            </Card>
        </div>
    );
};

export default Products;
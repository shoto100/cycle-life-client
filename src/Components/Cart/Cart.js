
import { Button } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ProductContext, userContext } from '../../App';
import './Cart.css'

const Cart = () => {
    const {productId} = useParams();
    const [products, setProducts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    // const [products, setProducts] = useContext(ProductContext);
    useEffect(() => {
      fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
          setProducts(data)
      })
  }, [])
  console.log(products);
  const {productName, productType, productPrice} = products;

    if (products.length > 0) {
      const cartProduct = products.find(pd => pd._id === productId);
      setProducts(cartProduct);
      console.log(cartProduct);
    }
    const cartData = {
        productName: products.productName,
        productType: products.productType,
        productPrice: products.productPrice,
        userName: loggedInUser.name,
        userEmail: loggedInUser.email,
        date: new Date()
      }
    
      const handleOrder = () => {
        fetch(`http://localhost:5000/addOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cartData)
        })
          .then(res => {
            alert("product successfully purchased");
          })
      }
    return (
        <Container className="p-4">
      <h3 className="text-center my-3">Your cart</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{productName}</td>
            <td>{productType}</td>
            <td>{productPrice}</td>
          </tr>
          <tr>
            <td colSpan="2" className="font-weight-bold">Total Price: </td>
            <td className="font-weight-bold">{productPrice}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Link to="/home" className="btn btn-warning text-white mr-3">Back to shopping</Link>
        <Button onClick={handleOrder} variant="success">Proceed to checkout</Button>
      </div>
    </Container >
    );
};

export default Cart;
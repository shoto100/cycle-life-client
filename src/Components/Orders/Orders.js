import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { userContext } from '../../App';

const Orders = () => {
  const [order, setOrder] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const userName = loggedInUser.email || loggedInUser.name;
  useEffect(() => {
    fetch(`https://cycle-life.herokuapp.com/allOrder`)
      .then(res => res.json())
      .then(data => setOrder(data))
  }, [])
  console.log(order);
  return (
    <Container className="p-3">
      <Table striped hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            order.map(od =>
              <tr key={od._id}>
                <td>{od.userName || "none"}</td>
                <td>{od.userEmail || "none"}</td>
                <td>{od.productName}</td>
                <td>{od.productType}</td>
                <td>{od.productPrice}</td>
                <td>{new Date(od.date).toDateString("dd/MM/yyyy")}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  );
};

export default Orders;
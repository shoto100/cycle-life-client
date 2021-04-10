import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Spinner } from 'react-bootstrap';
// import { ProductContext } from '../../App';
import Products from '../Products/Products';
import './Home.css'


const Home = () => {
    const [products, setProducts] = useState([]);
    // const [products, setProducts] = useContext(ProductContext);
    // setProducts(products);

    useEffect(() => {
        fetch('https://cycle-life.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="search-bar col-12 ">
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-1" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
                </div>
                <div className="all-products-wrapper">
                    <div className="container">
                        <div className="row justify-content-center" >
                            {
                                products.length === 0 && 
                                <div>
                                <Spinner animation="grow" variant="primary" />
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="success" />
                                <Spinner animation="grow" variant="danger" />
                                </div>
                            }
                            {
                                products.map(product =><Products product={product}></Products>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
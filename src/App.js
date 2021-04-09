import React, { createContext, useState } from "react";
import './App.css';
import Home from './Components/Home/Home';
import AddProduct from './Components/AddProduct/AddProduct';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Orders from './Components/Orders/Orders';
import Admin from './Components/Admin/Admin';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";


export const userContext = createContext({});
export const ProductContext = createContext([]);


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [products, setProducts] = useState([]);

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <ProductContext.Provider value={[products, setProducts]}>
      <Router>
        <div className="custom-nav">
          <div className="container">
            <Navbar expand="lg">
              <Navbar.Brand style={{fontWeight: 'bold', fontSize: "32px"}}>Cycle Life</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link  ><Link  className="link" to="/">Home</Link></Nav.Link>
                  <Nav.Link  ><Link  className="link" to="/orders">Orders</Link></Nav.Link>
                  <Nav.Link  ><Link  className="link" to="/admin">Admin</Link></Nav.Link>
                  {/* <Nav.Link  ><Link  className="link" to="/login">Login</Link></Nav.Link> */}

                  {
                    (loggedInUser.name)
                    ? <Nav.Link className="link" style={{fontWeight: "bold", border: "1px solid #333", borderRadius: "5px"}}>{loggedInUser.name}</Nav.Link> 
                    : <Nav.Link ><Link  className="link" to="/login">Login</Link></Nav.Link>
                  }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/cart/:productId">
              <Cart></Cart>
            </PrivateRoute>
            <Route path="/addProduct">
              <AddProduct />
            </Route>
            <Route path="/dashboard">
              
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
      </ProductContext.Provider>
    </userContext.Provider>
  );
}

export default App;

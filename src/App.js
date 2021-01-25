import React from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./components/Home";
import ListItems from "./components/ListItems";
import UpdateItem from "./components/UpdateItem";
import CreateItem from "./components/CreateItem";
import RemoveItem from "./components/RemoveItem";
import NoMatchPath from "./components/NoMatchPath";
import logo from "./logo.png";
// import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  let location = useLocation();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">MERN-Stack App
          <img src={logo} width="30" height="30" alt="#" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="list">Books</Nav.Link>
            <Nav.Link href="create">Create Book</Nav.Link>
            {/* <Nav.Link href="update">Update Book</Nav.Link> */}
            <Nav.Link href="remove">Remove Books</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch location={location}>
        <Route path="/" exact component={Home} />
        <Route path="/list" exact component={ListItems} />
        <Route path="/update/:id" component={UpdateItem} />
        <Route path="/create" component={CreateItem} />
        <Route path="/remove" component={RemoveItem} />
        <Route path="*" component={NoMatchPath} />
      </Switch>
    </div>
    );
}

export default App;

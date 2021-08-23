import React from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
import Description from "./components/Description";
import Books from "./components/Books";
import UpdateItem from "./components/UpdateItem";
import NoMatchPath from "./components/NoMatchPath";
import logo from "./logo.png";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const App: React.FC = () => {
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
            <Nav.Link href="remove">Remove Books</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch location={location}>
        <Route path="/" exact>
          <Description />
        </Route>
        <Route path="/list" exact>
          <Books allowDeletions={false} />
        </Route>
        <Route path="/create" exact>
          <UpdateItem isNewItem />
        </Route>
        <Route path="/remove" exact>
          <Books allowDeletions />
        </Route>
        <Route path="/update/:id">
          <UpdateItem isNewItem={false} />
        </Route>
        <Route path="*">
          <NoMatchPath />
        </Route>
      </Switch>
    </div>
    );
}

export default App;

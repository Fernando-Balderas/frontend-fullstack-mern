import React from "react";
import logo from "../assets/images/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        MERN-Stack App
        <img src={logo} width="30" height="30" alt="#" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/list">Books</Nav.Link>
          <Nav.Link href="/create">Create Book</Nav.Link>
          <Nav.Link href="/remove">Remove Books</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

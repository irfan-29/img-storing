import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";

function Header(){
    return <div>
     <Navbar bg="dark" data-bs-theme="dark" style={{height:"60px"}}>
      <Container>
        <NavLink to="/" className="text-decoration-none text-light mx-2">Navbar</NavLink>
        <Nav className="me-auto">
          <NavLink to="/register" className="text-decoration-none text-light mx-2">Register</NavLink>
        </Nav>
      </Container>
    </Navbar>
  </div>;
}

export default Header;
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function navbar() {
  return (
    <Navbar bg="light" expanded="sm">
      <Navbar.Brand as={Link} to="/">
        Diogo's Drive
      </Navbar.Brand>
      <Nav.Link as={Link} to="/user">
        Profile
      </Nav.Link>
    </Navbar>
  );
}
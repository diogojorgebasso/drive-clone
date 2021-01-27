import React from "react";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import Navbar from "./navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar></Navbar>

      <Container fluid>
        <AddFolderButton />
      </Container>
    </>
  );
}

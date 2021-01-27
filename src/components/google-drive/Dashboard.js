import React from "react";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import Navbar from "./navbar";
import Folder from "./Folder";
import { useFolder } from "../../hooks/useFolder";

export default function Dashboard() {
  const { folder } = useFolder("3aenm6sK0sm6HL9dR4p0");
  console.log(folder);
  return (
    <>
      <Navbar></Navbar>

      <Container fluid>
        <AddFolderButton currentFolder={folder} />
        <Folder folder={folder}></Folder>
      </Container>
    </>
  );
}

import React from "react";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import Navbar from "./navbar";
import Folder from "./Folder";
import { useFolder } from "../../hooks/useFolder";

export default function Dashboard() {
  const { folder, childFolders } = useFolder("3aenm6sK0sm6HL9dR4p0");
  console.log(folder);
  return (
    <>
      <Navbar></Navbar>

      <Container fluid>
        <AddFolderButton currentFolder={folder} />
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder, index) => (
              <div key={index} style={{ maxWidth: "250px" }} className="p2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

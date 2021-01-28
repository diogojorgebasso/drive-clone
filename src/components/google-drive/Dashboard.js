import React from "react";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import Navbar from "./navbar";
import Folder from "./Folder";
import { useFolder } from "../../hooks/useFolder";

export default function Dashboard() {
  const { folder, childFolders } = useFolder("3aenm6sK0sm6HL9dR4p0");
  console.log(childFolders);
  return (
    <>
      <Navbar />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "200px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

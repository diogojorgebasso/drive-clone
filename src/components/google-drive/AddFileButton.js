import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { storage, database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidv4 } from "uuid";
import { Toast, ProgressBar } from "react-bootstrap";
export default function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;
    const id = uuidv4();
    setUploadingFiles((prevUploadFiles) => [
      ...prevUploadFiles,
      { id, name: file.name, progress: 0, error: false },
    ]);
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files.add({
            url,
            name: file.name,
            timeStamp: database.getTime(),
            folderId: currentFolder.id,
            userId: currentUser.uid,
          });
        });
      }
    );
  }
  return (
    <>
      <label className="m-0 mr-2 btn btn-outline-success btn-sm">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "1000px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast key={file.id}>
                <Toast.Header className="text-truncate w-100 d-block">
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  ></ProgressBar>
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

export default function AddFileButton({ currentFolder }) {
  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;
  }
  return (
    <label className="m-0 mr-2 btn btn-outline-success btn-sm">
      <FontAwesomeIcon icon={faFileUpload} />
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: "absolute", left: "1000px" }}
      />
    </label>
  );
}

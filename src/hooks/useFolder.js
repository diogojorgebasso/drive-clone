import React from "react";
import { useReducer } from "react";

export default function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolder: [],
    childFiles: [],
  });
  return <div></div>;
}

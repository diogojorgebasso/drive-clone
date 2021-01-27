import { useReducer, useEffect } from "react";
import { database } from "../firebase";
const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
};
const ROOT_FOLDER = {
  name: "root",
  id: null,
  path: [],
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolder: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return { ...state, folder: payload.folder };
    default:
      return state;
  }
}
export default function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolder: [],
    childFiles: [],
  });
  useEffect(
    () =>
      dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } }),
    [folder, folderId]
  );
  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formattedDoc(doc) },
        });
        console.log(database.formattedDoc);
      })
      .catch(() =>
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        })
      );
  }, [folderId]);
  return state;
}

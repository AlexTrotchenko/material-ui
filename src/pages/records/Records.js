import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContainers } from "../../firestoreService";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { listenToContainers } from "../../redux/recordReducer/recordActions";
import RecordsGrid from "./RecordsGrid";

export const Records = () => {
  const { records } = useSelector((state) => state.records);
  const dispatch = useDispatch();
  useFirestoreCollection({
    query: getContainers,
    data: (data) => dispatch(listenToContainers(data)),
    deps: [dispatch],
  });
  return <RecordsGrid rows={records} />;
};

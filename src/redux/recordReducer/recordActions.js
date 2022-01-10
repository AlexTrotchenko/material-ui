import {
  LISTEN_TO_CONTAINERS,
  LISTEN_TO_SELECTED_CONTAINER,
  SET_LAST_VAL_FROM_DB,
} from "./recordConstants";

export function listenToSelectedContainer(container) {
  return {
    type: LISTEN_TO_SELECTED_CONTAINER,
    payload: container,
  };
}

export function listenToContainers(containers) {
  return { type: LISTEN_TO_CONTAINERS, payload: containers };
}

export function setLastValFromDb(val) {
  return { type: SET_LAST_VAL_FROM_DB, payload: val };
}

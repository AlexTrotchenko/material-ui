import {
  LISTEN_TO_CONTAINERS,
  LISTEN_TO_SELECTED_CONTAINER,
  SET_LAST_VAL_FROM_DB,
} from "./recordConstants";

const initialState = {
  records: [],
  selectedRecord: null,
  lastVal: [null, null, null, null],
};

const recordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LISTEN_TO_SELECTED_CONTAINER:
      return {
        ...state,
        selectedRecord: payload,
      };
    case LISTEN_TO_CONTAINERS:
      return {
        ...state,
        records: payload,
      };
    case SET_LAST_VAL_FROM_DB:
      return {
        ...state,
        lastVal: payload,
      };

    default:
      return state;
  }
};
export default recordReducer;

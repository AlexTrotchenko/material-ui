import { combineReducers } from "redux";
import asyncReducer from "../asyncReducer/asyncReducer";
import authReducer from "../authReducer/authReducer";
import modalReducer from "../modalReducer/modalReducer";
import recordReducer from "../recordReducer/recordReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  records: recordReducer,
  async: asyncReducer,
  modals: modalReducer,
});

export default rootReducer;

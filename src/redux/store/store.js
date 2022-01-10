import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../rootReducer/rootReducer";
import ReactThunk from "redux-thunk";
import { verifyAuth } from "../authReducer/authActions";

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReactThunk))
  );
  store.dispatch(verifyAuth());
  return store;
};

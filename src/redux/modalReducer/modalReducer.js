import { CLOSE_MODAL, OPEN_MODAL } from "./modalConstants";

const initialState = null;

export default function modalReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_MODAL:
      const { modalType, modalProps } = payload;
      return { modalType, modalProps };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}

import { createStore } from "redux";
import reducer from "../Reducers/index";

export function configureStore(initialState = {}) {
  const store = createStore(reducer, initialState);
  return store;
}

export const store = configureStore();

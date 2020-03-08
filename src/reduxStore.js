import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import { verifyAuth } from "./actions";
import rootReducer from "./reducers";


export default function configureStore(runState) {
  const store = createStore(
    rootReducer,
    runState,
    applyMiddleware(thunkMiddleware)
  );
  store.dispatch(verifyAuth());
  return store;
}
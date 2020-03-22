import { combineReducers } from "redux";

import auth from "./auth";
import budgets from "./budgets";

export default combineReducers({auth, budgets});
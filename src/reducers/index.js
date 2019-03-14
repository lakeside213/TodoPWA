import { combineReducers } from "redux";

import user from "./userReducer";
import snackbar from "./snackbarReducer";
const rootReducer = combineReducers({
  user,
  snackbar
});

export default rootReducer;

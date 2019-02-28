import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  regUser: authReducer
});

export default rootReducer;

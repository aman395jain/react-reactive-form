import { combineReducers } from "redux";
import authReducer from "./authReducer";
import countryReducer from "./countryReducer";
import stateReducer from "./stateReducer";

const rootReducer = combineReducers({
  regUser: authReducer,
  regCountry: countryReducer,
  regState: stateReducer
});

export default rootReducer;

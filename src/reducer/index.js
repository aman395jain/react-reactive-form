import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import countryReducer from "./countryReducer";
import stateReducer from "./stateReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import countryReducerNew from "./countryReducerNew";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  regUser: signUpReducer,
  regCountry: countryReducer,
  regState: stateReducer,
  regCountryNew: countryReducerNew
});

export default rootReducer;

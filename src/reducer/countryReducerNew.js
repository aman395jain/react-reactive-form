import { SET_REGISTER_COUNTRY_NEW } from "../actions/types";

const initialState = { isAuthentication: false, regCountryNew: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER_COUNTRY_NEW:
      return { regCountryDataNew: action.payload };
    default:
      return state;
  }
}

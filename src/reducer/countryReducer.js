import { SET_REGISTER_COUNTRY } from "../actions/types";

const initialState = { isAuthentication: false, regCountry: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER_COUNTRY:
      return { regCountryData: action.payload };
    default:
      return state;
  }
}

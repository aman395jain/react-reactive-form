import { SET_REGISTER_STATE } from "../actions/types";

const initialState = { isAuthentication: false, regState: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER_STATE:
      return { regStateData: action.payload };
    default:
      return state;
  }
}

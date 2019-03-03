import { SET_REGISTER } from "../actions/types";

const initialState = { isAuthentication: false, regData: {} };

export default function(state = initialState, action) {
  // console.log("reducers", action.type);
  switch (action.type) {
    case SET_REGISTER:
      return action.payload;
    default:
      return state;
  }
}

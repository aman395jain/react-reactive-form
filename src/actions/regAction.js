import { SET_REGISTER } from "./types";
import signUpService from "../services/signUp_service";

// Register User
export const registerUser = userData => dispatch => {
  console.log("in the action", userData.address.country);

  signUpService
    .postSignUp(userData)
    .then(res => {
      console.log("in the sign up action", res);
      dispatch({
        type: SET_REGISTER,
        payload: {
          userData: { ...userData, postStatus: res.status }
        }
      });
    })
    .catch(err => {
      console.log("in err", err.response.status);
      dispatch({
        type: SET_REGISTER,
        payload: {
          userData: { ...userData, postStatus: err.response.status }
        }
      });
    });
};

//get country

// export const countryData = userData => dispatch => {
//   signUpService.getCountry().then(res => {
//     dispatch({
//       type: SET_REGISTER,
//       payload: {
//         userData: {
//           ...userData,
//           country: res.data
//         }
//       }
//     });
//   });
// };

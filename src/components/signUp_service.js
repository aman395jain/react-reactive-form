import axios from "axios";

const signUpService = {
  postSignUp: signUpData => {
    console.log("in the service", signUpData);
    return axios.post(
      "http://www.mocky.io/v2/5c6d14743700001119fa31bb",
      {
        header: { "Content-Type": "application/json" }
      },
      {
        createdByUserId: Math.random(),
        employeeId: signUpData.empId,
        firstName: signUpData.fName,
        lastName: signUpData.lName,
        organization: signUpData.orgName,
        roleId: 0,
        userContactDTO: {
          address: signUpData.address.streetAddress,
          city: signUpData.address.city,
          continent: signUpData.address.continent,
          country: signUpData.address.country,
          emailId: signUpData.regEmail,
          phoneNo: signUpData.phNumber,
          state: signUpData.address.state,
          zip: signUpData.address.zipCode
        },
        userId: Math.random()
      }
    );
  },

  getCountry: () => {
    return axios.get(
      "http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/country"
    );
  },
  getStateAgainstCountry: countryId => {
    console.log("in the getStateAgainstCountry", countryId);
    return axios.get(
      "http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/state/{countryId}?countryId=" +
        countryId
    );
  },
  getCityAgainstState: stateId => {
    console.log("in the getStateAgainstCountry", stateId);
    return axios.get(
      "http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/city/{stateId}?stateId=" +
        stateId
    );
  }
};

export default signUpService;

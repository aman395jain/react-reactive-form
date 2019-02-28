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
    return axios.get("http://www.mocky.io/v2/5c6d4000370000530afa334d");
  }
};

export default signUpService;

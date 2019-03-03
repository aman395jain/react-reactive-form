import React, { Component } from "react";
import {
  FormBuilder,
  Validators,
  FieldGroup,
  FieldControl
} from "react-reactive-form";
import _ from "lodash";

import checkValidations from "./validations";
import signUpService from "./signUp_service";
import CountryList from "./countryComponent";
import StateList from "./stateListComponent";
import Citylist from "./cityComponent";
/* 
    User sign-up/ Registration Page.
*/

class signUp extends Component {
  state = {
    selectedCountry: "",
    selectedState: "",
    selectedCity: ""
  };
  registerFormNew = FormBuilder.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    Email: ["", [Validators.required, Validators.email]],
    PhoneNumber: ["", [Validators.required, Validators.minLength(10)]],
    address: FormBuilder.group({
      streetAddress: ["", Validators.required],
      continent: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      zipCode: ["", Validators.required]
    }),
    empId: ["", [Validators.required]],
    organization: "BMW"
  });

  onSubmit(e) {
    // this.registerFormNew.value.address.country = this.state.selectedCountry;
    console.log("country value", this.registerFormNew.value.address.country);
    this.registerFormNew.value.address.state = this.state.selectedState;
    this.registerFormNew.value.address.city = this.state.selectedCity;
    e.preventDefault();
    signUpService
      .postSignUp(this.registerFormNew.value)
      .then(res => {
        console.log("success of form submission", res.status);
      })
      .catch(err => {
        console.log(err.status);
      });
  }

  getCountry = countryNameFromCountryComp => {
    this.setState({
      selectedCountry: countryNameFromCountryComp
    });
  };

  getState = stateNameFromStateComp => {
    this.setState({
      selectedState: stateNameFromStateComp
    });
  };

  getCity = cityNameFromCityComp => {
    this.setState({
      selectedCity: cityNameFromCityComp
    });
  };

  render() {
    return (
      <FieldGroup
        control={this.registerFormNew}
        render={() => (
          <div className="container">
            <h2>Registration Form</h2>
            <div
              className="form_container"
              style={{ border: "1px solid black" }}
            >
              <form className="register_form" onSubmit={e => this.onSubmit(e)}>
                <div className="row">
                  <FieldControl
                    name="address.country"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Country</label>
                          <CountryList
                            onCountryChange={this.getCountry}
                            {...handler()}
                          />

                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("Country"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="address.state"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>State</label>

                          <StateList onStateChange={this.getState} />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("State"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <FieldControl
                    name="address.city"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>city</label>

                          <Citylist onCityChange={this.getCity} />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("City"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12 text-center">
                      <button
                        className="btn btn-outline-secondary mr-1"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-danger ml-1" disabled="">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      />
    );
  }
}

export default signUp;

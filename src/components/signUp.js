import React, { Component } from "react";
import {
  FormBuilder,
  Validators,
  FieldGroup,
  FieldControl
} from "react-reactive-form";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CountryComponent from "./country";
import StateComponent from "./state";

/* 
    User sign-up/ Registration Page 
*/

class signUp extends Component {
  state = {
    selectedCountry: "",
    city: [],
    stateInCountry: []
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

  countrySelectedByComponent = selectedCountry => {
    this.setState({
      selectedCountry: selectedCountry
    });
  };

  render() {
    console.log("selectedCountry in render", this.state.selectedCountry);
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
                    render={() => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Country</label>
                          <CountryComponent
                            countrySelected={this.countrySelectedByComponent}
                          />
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="address.state"
                    render={() => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>State</label>
                          <StateComponent
                            countryForState={this.state.selectedCountry}
                          />
                        </div>
                      </div>
                    )}
                  />
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

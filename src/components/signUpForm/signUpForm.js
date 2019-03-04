import React, { Component } from "react";
import "./App.scss";

import TextInput from "./TextInput";
import validate from "./validate";
import TextArea from "./TextArea";
import Email from "./Email";
import Select from "./Select";
import signUpService from "../signUp_service";

class SignUpFormComponent extends Component {
  state = {
    formIsValid: false,
    formControls: {
      name: {
        value: "",
        placeholder: "What is your name",
        valid: false,
        validationRules: {
          minLength: 4,
          isRequired: true
        },
        touched: false
      },
      country: {
        value: "",
        placeholder: "What is your country",
        valid: false,
        touched: false,
        validationRules: {
          isRequired: true
        },
        options: [1, 2, 3, 4, 5]
      },
      formState: {
        value: "",
        placeholder: "What is your state",
        valid: false,
        touched: false,
        validationRules: {
          isRequired: true
        },
        options: [1, 2, 3, 4, 5]
      }
    }
  };

  // componentWillMount() {
  //   signUpService.getCountry().then(res => {
  //     this.setState({
  //       formControls: {
  //         country: {
  //           options: res.data.map(countryValue => {
  //             return countryValue;
  //           })
  //         }
  //       }
  //     });
  //   });
  // }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(
      value,
      updatedFormElement.validationRules
    );

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });
  };

  formSubmitHandler = () => {
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }

    console.log(formData);
  };

  render() {
    console.log("state value", this.state.formControls.formState);
    return (
      <div className="App">
        <Select
          name="country"
          value={this.state.formControls.country.value}
          options={this.state.formControls.country.options}
          touched={this.state.formControls.country.touched}
          valid={this.state.formControls.country.valid}
          onChange={this.changeHandler}
          placeholder={this.state.formControls.country.placeholder}
        />
        <Select
          name="formState"
          value={this.state.formControls.formState.value}
          options={this.state.formControls.formState.options}
          touched={this.state.formControls.formState.touched}
          valid={this.state.formControls.formState.valid}
          onChange={this.changeHandler}
          placeholder={this.state.formControls.formState.placeholder}
        />
        <button
          onClick={this.formSubmitHandler}
          disabled={!this.state.formIsValid}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SignUpFormComponent;

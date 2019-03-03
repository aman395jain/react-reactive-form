import React, { Component } from "react";
import { connect } from "react-redux";

import signUpService from "../../components/signUp_service";
import SelectListGroup from "./SelectListGroup";

/* 
    Shared Component for list of countries
*/
class Country extends Component {
  state = {
    countryList: [],
    option: {
      label: "",
      value: ""
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return this.props.countryData.label.length > 0 ? (
      <SelectListGroup
        name="country"
        value="country"
        error="error Select"
        onChange={this.onChange}
        options={this.props.countryData}
      />
    ) : null;
  }
}

// function mapStateToProps(state) {
//   console.log("in country list", state.regCountryNew.regCountryDataNew);
//   return {
//     countryStateNew: state.regCountryNew.regCountryDataNew
//   };
// }

export default Country;

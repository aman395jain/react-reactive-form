import React, { Component } from "react";
import { connect } from "react-redux";

class country extends Component {
  selectCountry = e => {
    this.props.countrySelected(e.target.value);
    this.props.dispatch({
      type: "SET_REGISTER",
      payload: e.target.value
    });
  };

  render() {
    return (
      <div>
        <select className="form-control" onClick={this.selectCountry}>
          <option value="us">US</option>
          <option value="uk">UK</option>
          <option value="india">India</option>
          <option value="china">China</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    countryState: state.regCountry
  };
}

export default connect(mapStateToProps)(country);

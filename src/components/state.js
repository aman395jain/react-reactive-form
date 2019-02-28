import React, { Component } from "react";
import { connect } from "react-redux";

class StateOfCountry extends Component {
  state = { country: "" };

  componentWillReceiveProps = nextprops => {
    console.log("componentWillReceiveProps", nextprops.countryState1);
    this.setState({
      country: nextprops.countryState1
    });
  };

  render() {
    console.log("in the state render", this.state.country);

    return <div>nbbjnm.</div>;
  }
}

function mapStateToProps(state) {
  console.log("in mapStateToProps in state component", state.regUser);
  return {
    countryState1: state.regUser
  };
}

export default connect(mapStateToProps)(StateOfCountry);

import React, { Component } from "react";
import { connect } from "react-redux";

class StateOfCountry extends Component {
  componentDidMount = () => {
    console.log("in renderState componentWillMount", this.props.countryState);
  };

  render() {
    console.log("in the state render", this.props.countryState);
    return <div>nbbjnm.</div>;
  }
}

function mapStateToProps(state) {
  console.log("in mapStateToProps in state component", state.regUser);
  return {
    countryState: state.regUser
  };
}

export default connect(mapStateToProps)(StateOfCountry);

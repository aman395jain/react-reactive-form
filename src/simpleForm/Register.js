import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import TextFieldGroup from "./common/TextFieldGroup";
import signUpService from "../components/signUp_service";
import CountryList from "./common/countryListComponent";
import SelectListGroup from "./common/SelectListGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      countryData: {
        label: [],
        value: []
      },
      countryList: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    let res = await signUpService.getCountry();
    res.data.map(res => {
      this.setState({
        countryList: res
      });
    });
    res.data.map(res => {
      this.setState({
        countryData: {
          label: res.name,
          value: res.countryId
        }
      });
    });
    this.props.dispatch({
      type: "SET_REGISTER_COUNTRY_NEW",
      payload: this.state.countryData
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("bhbjhjh", nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {};

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    console.log("hhhhhh", this.state.countryData);

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                {this.state.countryData.label.length > 0 ? (
                  <SelectListGroup
                    name="country"
                    value="country"
                    error="error Select"
                    onChange={this.onChange}
                    options={this.state.countryData}
                  />
                ) : (
                  ""
                )}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   errors: state.errors
// });

export default connect()(Register);

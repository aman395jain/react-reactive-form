import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Router from "./Router";

class App extends Component {
  state = { isLogin: false };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          {/* <Header isAuthorized={this.state.isLogin} /> */}
        </div>
        {/* <Navigation /> */}
        <Router />
      </React.Fragment>
    );
  }
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp11 from "./components/signUp";

const Router = () => (
  <Switch>
    <Route exact path="/" component={SignUp11} />
  </Switch>
);

export default Router;

import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./components/signUp";

const Router = () => (
  <Switch>
    <Route exact path="/" component={SignUp} />
  </Switch>
);

export default Router;

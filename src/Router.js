import React from "react";
import { Switch, Route } from "react-router-dom";
import CarManagement from "./components/signUp";
import CarDetail from "./components/user/car-details/carDetail";
import GoogleMapComponent from "./components/user/Google-Map/googleMapRoute";
import ModalForm from "./components/user/forms/modalForm";
import userForm from "./components/user/forms/userForm";

const Router = () => (
  <Switch>
    <Route exact path="/" component={CarManagement} />
    {/* <Route exact path="/carDetails/:vin" component={CarDetail} />
    <Route exact path="/googleMapComponent" component={GoogleMapComponent} />
    <Route exact path="/modalform/:vin" component={ModalForm} />
    <Route exact path="/openform/:vin" component={userForm} /> */}
  </Switch>
);

export default Router;

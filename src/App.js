import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

//Higher order component protected route
import ProtectedRoute from "./Components/ProtectedRoute";

// Presentational Components
import AppHeader from "./Components/AppHeader.react";
import Login from "./Components/RoutesScreens/Login.react";
import UserHomeScreen from "./Components/RoutesScreens/UserHomeScreen.react";

function App(props) {
  const { isAuthenticated, isVerifying } = props;

  return (
    <div className="rootApp" style={{maxWidth: 1000, padding: "0px 16px", margin: '16px auto auto'}}>
      <AppHeader isAuthenticated={isAuthenticated} isVerifying={isVerifying}/>
      <Switch>
        <ProtectedRoute exact path='/userhome' component={UserHomeScreen} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);

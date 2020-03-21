import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

//Higher order component protected route
import ProtectedRoute from "./Components/ProtectedRoute";

// Presentational Components
import AppHeader from "./Components/AppHeader.react";
import Login from "./Components/RoutesScreens/Login.react";
import UserHomeScreen from "./Components/RoutesScreens/UserHomeScreen.react";
import FPContent from "./Components/RoutesScreens/FPContent.react";
import Signup from "./Components/RoutesScreens/Signup.react";
import CookieConsent from "react-cookie-consent";
import './app.scss';

function App(props) {
  const { isAuthenticated, isVerifying , user} = props;

  return (
    <div className="rootApp" style={{maxWidth: 1000, padding: "0px 16px", margin: '16px auto auto'}}>
      <AppHeader isAuthenticated={isAuthenticated} isVerifying={isVerifying}/>
      <Switch>
        <ProtectedRoute exact path='/userhome' component={UserHomeScreen} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={FPContent } />
      </Switch>
      <CookieConsent
    location="bottom"
    buttonText="Agree"
    cookieName="myAwesomeCookieName2"
    style={{ background: "#2B373B", fontFamily: 'Roboto, sans-serif'}}
    buttonStyle={{ background: '#fff', fontSize: "14px" }}
    expires={150}
>
    This website uses cookies to enhance the user experience and advertizing. While spendingo is free, a source of income is necessary. If you do not agree please leave the site.

</CookieConsent>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(App);

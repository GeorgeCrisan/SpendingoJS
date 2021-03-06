import React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

//Higher order component protected route
import ProtectedRoute from "./Components/ProtectedRoute";

// Presentational Components
import AppHeader from "./Components/AppHeader.react";
import Login from "./Components/RoutesScreens/Login.react";
import UserDashboard from "./Components/RoutesScreens/UserDashboard.react";
import ManageBudget from "./Components/RoutesScreens/ManageBudget.react";
import FPContent from "./Components/RoutesScreens/FPContent.react";
import Signup from "./Components/RoutesScreens/Signup.react";
import CookieConsent from "react-cookie-consent";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import './app.scss';

function App(props) {
  const { isAuthenticated, isVerifying  ,user } = props;

  return (
    <div className="rootApp" style={{ maxWidth: 1000, margin: '16px auto auto' }}>
      <AppHeader isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
      <Switch>
        <ProtectedRoute exact path='/userhome' component={()=>{return (<UserDashboard user={user ? user : false} />)}} isAuthenticated={isAuthenticated} isVerifying={isVerifying} ></ProtectedRoute>
        <ProtectedRoute exact path='/managebudget' component={ManageBudget} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={FPContent} />
      </Switch>
      <div className='footer'> <p>Made with <FavoriteBorderIcon style={{color: 'red'}} /> by <a style={{color: '#fff'}} href='https://www.georgecrisan.com'>georgecrisan.com</a></p></div>
      <CookieConsent
        location="bottom"
        buttonText="Agree"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B", fontFamily: 'Roboto, sans-serif' }}
        buttonStyle={{ background: '#fff', fontSize: "14px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.

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

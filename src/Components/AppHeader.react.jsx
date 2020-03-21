import React from 'react';
//import Button from '@material-ui/core/Button';
import ButtonSpendingo from './ButtonSpendingo';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions';
import {Typography} from "@material-ui/core";
import './appheader.scss';

const AppHeader = (props) => {
  let { isAuthenticated } = props;
  const { dispatch } = props;
  const logout = () => {
    dispatch(logoutUser());
  };

  return (<div className='main__header__wrapper'>
    <div className='main__header__inner' >
      <div className='main__header__typo'>
        <Link style={{textDecoration: 'none'}} to='/'>
        <Typography component="h1" variant="h5">
          Welcome to Spendingo
        </Typography>
        <Typography align='center' component="p" variant="subtitle1">
          The Joy of managing any budget
        </Typography>
        </Link>
      </div>
      <div className='main__header__buttons'>
      {isAuthenticated && <ButtonSpendingo onClick={logout}>{'Logout'}</ButtonSpendingo>}
      {!isAuthenticated && <Link style={{ textDecoration: 'none', marginRight: 16 }} to={'/login'}><ButtonSpendingo>{'Login'}</ButtonSpendingo></Link>}
      {!isAuthenticated && <Link style={{ textDecoration: 'none' }} to={'/signup'}><ButtonSpendingo>{'Sign Up'}</ButtonSpendingo></Link>}
      </div>
    </div>
  </div>);
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(AppHeader);
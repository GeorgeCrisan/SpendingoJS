import React, { useEffect, useState } from 'react';
import { Container, Button, Paper, TextField } from '@material-ui/core';
import moment from 'moment';
import { passwordReset, deleteAccount, logoutUser } from "../actions";
import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function validateEmail(email) {
  var re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return re.test(email);
}

function MyAccount(props) {
  const [resetEmail, setResetEmail] = useState('');
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState('');
  let { user, stateAuth, dispatch } = props;
  const [deleteWarning, setDeleteWarning] = useState(false);


  const handlePassChange = ({ target }) => {
    setPassword(target.value);
  };

  const deleteAccountLocal = () => {
    if (!deleteWarning) {
      setDeleteWarning(true);
      return false;
    } else {
      setDeleteWarning(false);
      // do dispatch delete data and account 
      dispatch(deleteAccount(password));
    }
  }

  const submitReset = () => {
    if (validateEmail(resetEmail)) {
      dispatch(passwordReset(resetEmail));
      setEmailNotValid(false);
      setShowSuccess(true);
      return;
    }

    setEmailNotValid(true);
  }

  let error = stateAuth.resetPassErr;
  let delError = stateAuth.deleteAccountErr;
  let accDeleted = stateAuth.accountDeleted;

  if (accDeleted) {
    dispatch(logoutUser());
    //return (<Redirect to="/" />);
  }
  return (
    <Drawer anchor={'top'} open={props.maopen} onClose={props.onClose}>
      <Container component="main" maxWidth="md">
        <h2 style={{ textAlign: 'center', color: '#2196F3', marginTop: 32 }} >

          Manage Account {user ? `- ${user.displayName}` : 'null'}</h2>
        <div style={{ display: 'flex', flexFlow: 'column' }}>

          <div style={{ display: 'flex', flexFlow: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <TextField
              style={{ width: 280, marginRight: 16 }}
              variant="outlined"
              margin="normal"
              id="reset password"
              error={emailNotValid}
              helperText={emailNotValid ? 'Email format is not valid' : ''}
              label="Reset password via email"
              name="email"
              onChange={(evt) => { setResetEmail(evt.target.value) }}
            />
            <Button
              variant='outlined'
              onClick={submitReset}
              className='macc__button'> Submit </Button>
          </div>
          {deleteWarning && <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handlePassChange}
          />}
          <Button onClick={deleteAccountLocal} style={{ margin: '16px auto', width: '100%' }} varian='outlined' className={'deleteaccount--expanded--danger'} > {deleteWarning ? 'Confirm' : 'Delete Account'}  </Button>
          {deleteWarning && <div style={{ color: 'red', fontSize: 14, textAlign: 'center', margin: 16, width: '100%' }}> Are you sure? You will lose all the data. Click again to confirm.</div>}
          {delError && delError.isError && delError.message && <div style={{ color: 'red', fontSize: 14, textAlign: 'center', margin: 16, width: '100%' }} >{`${delError.message}`}</div>}
          {error && error.isError && error.message && <div style={{ color: 'red', fontSize: 14, textAlign: 'center', margin: 16, width: '100%' }} >{`${error.message}`}</div>}
          <Button disabled={false} style={{ marginTop: 16, marginBottom: 16 }} className={'macc__button'} variant="outlined" size='large' onClick={props.onClose} > Done </Button>
        </div>


      </Container>
    </Drawer>);
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    stateAuth: state.auth
  }
}

export default connect(mapStateToProps)(MyAccount);
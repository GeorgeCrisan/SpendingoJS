import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser, passwordReset } from "../../actions";
import { withStyles } from "@material-ui/styles";

import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography, Paper, Container, TextField, Button, Avatar } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';

function validateEmail(email) {
  var re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return re.test(email);
}

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  password: {
    alignSelf: 'flex-start',
    fontSize: 14,
    paddingTop: 6
  },

  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
    backgroundColor: "#faa500"
  },
  submit: {
    marginTop: 20
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
});

const Login = (props) => {
  const { classes, loginError, isAuthenticated } = props;
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = () => {
    const { dispatch } = props;
    dispatch(loginUser(email, password));
  }

  const submitReset = () => {
    console.log('submited');
    const { dispatch } = props;
    if (validateEmail(resetEmail)) {
      dispatch(passwordReset(resetEmail));
      setEmailNotValid(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
      return;
    }

    setEmailNotValid(true);
  }

  if (isAuthenticated) {
    return <Redirect to="/userhome" />;
  }

  return (<Container component="main" maxWidth="xs">
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <VpnKeyOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
    </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        onChange={handleEmailChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={handlePassChange}
      />
      {loginError && (
        <Typography component="p" className={classes.errorText}>
          <ErrorIcon style={{position: 'relative', top: 7}} /> Incorrect email or password.
        </Typography>
      )}

      <Typography component="p" className={classes.password}>
        <span style={{ marginRight: 6 }}>Request password reset </span>
        <Button variant="outlined" size='small' style={{ fontSize: 10 }} color="primary" onClick={() => { setShowModal(true); }} > here </Button>
      </Typography>

      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Sign In
    </Button>
    {console.log(showModal)}
      <Drawer anchor={'top'} open={Boolean(showModal)} onClose={() => setShowModal('false')}>

        <Container component="main" maxWidth="md">
          {showSuccess && <Typography component="h4" style={{ padding: '16px 16px 16px 0', color: '#4BB543' }} >
          <MailOutlineIcon style={{position: 'relative', top: 5, color: '#4BB543'}} />Password reset request sent. Please check your email inbox.Thank you!
        </Typography>}
          {!showSuccess && <div className='reset__password__wrapper'>
            <Typography component="p" style={{ paddingTop: 16 }} >
            <MailOutlineIcon style={{position: 'relative', top: 5, color: '#4BB543'}} /> Please use a valid email address to reset your password.
        </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              id="email"
              error={emailNotValid}
              helperText={emailNotValid ? 'Email format is not valid' : ''}
              style={{ width: '70%', marginRight: 16 }}
              label="Email address"
              name="email"
              onChange={(evt) => { setResetEmail(evt.target.value) }}
            />
            <Button variant="outlined" size='large' style={{ margin: '22px 16px 16px 0px' }} onClick={() => { setShowModal(false); }} > Cancel </Button>
            <Button variant="outlined" size='large' style={{ margin: '22px 16px 16px 0px' }} color="primary" onClick={() => submitReset()} > Submit </Button>
          </div>}
        </Container>
      </Drawer>
    </Paper>
  </Container>);
};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
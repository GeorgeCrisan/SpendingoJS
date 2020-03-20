import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions";
import { withStyles } from "@material-ui/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {Typography, Paper, Container, TextField, Button, Avatar} from "@material-ui/core";


const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: 200,
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
  const [password, setPassword] = useState('');

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = () => {
    const { dispatch } = props;
    console.log(email, password);
    dispatch(loginUser(email, password));
  }

  if (isAuthenticated) {
    return <Redirect to="/userhome" />;
  }

  return (<Container component="main" maxWidth="xs">
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
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
          Incorrect email or password.
        </Typography>
      )}
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
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createUser } from "../../actions";
import { withStyles } from "@material-ui/styles";

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {Typography, Paper, Container, TextField, Button, Avatar} from "@material-ui/core";


const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
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

const Signup = (props) => {
  const { classes, loginError, isAuthenticated ,createError } = props;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleChange = ({target}, type) => {

    switch (type) {
      case 'displayName':
        setName(target.value);
        break;
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      default:
        break;
    } 
      
  }

  const handleSubmit = () => {
    const { dispatch } = props;
    console.log(email, password, name);
    dispatch(createUser( email, password, name));
  }

  if (isAuthenticated) {
    return <Redirect to="/userhome" />;
  }

  return (<Container component="main" maxWidth="xs">
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountCircleOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create an account
    </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="username"
        label="Display Name"
        name="Display Name"
        onChange={(ev)=>{handleChange(ev,'displayName')}}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        onChange={(ev)=>{handleChange(ev,'email')}}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={(ev)=>{handleChange(ev,'password')}}
      />
      {loginError && (
        <Typography component="p" className={classes.errorText}>
          Incorrect email or password.
        </Typography>
      )}
      {createError?.isError && (
        <Typography component="p" className={classes.errorText}>
        {`${createError?.message ? createError.message : 'Error'}`}
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
        Create
    </Button>
    </Paper>
  </Container>);
};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    createError: state.auth.createError,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Signup));


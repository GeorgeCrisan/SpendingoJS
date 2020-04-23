import React, { useEffect } from 'react';
import { fetchBudgets, addBudget, removeBudget, removeEntry } from '../../actions';
import './userdashboard.scss';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Container, Button, Paper, TextField } from '@material-ui/core';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

//Components

import SelectedBudget from '../SelectedBudget.react';
import BudgetsList from '../BudgetsList.react';

function BuddgetForm(props) {

  var [formState, setFormState] = React.useState({ currency: 'uk', title: ' ', description: ' ', total: '0' });

  function addBudget() {

    let objTS = { ...formState };

    objTS.createddate = new Date();
    objTS.updateddate = objTS.createddate;
    objTS.progress = '0';
    objTS.entries = [];
    objTS.finalized = false;
    objTS.title = objTS.title.trim();
    objTS.description = objTS.description.trim();

    props.addBudgetAction(objTS);
    props.close(false);
  }

  function isValid() {
    return ((formState.title && formState.title.length > 2 && formState.title.length <= 60) &&
      (formState.total && Number(formState.total) > 1 && Number(formState.total) < 99000000) &&
      (formState.description && formState.description.length > 2 && formState.description.length <= 100));
  }


  function onChange(type, value) {
    setFormState({ ...formState, [type]: value });
  }

  useEffect(() => {

  }, [formState]);

  function isValidTotal() {

    let value = Number(formState.total);

    if (value >= 0 && value < 99000000) {
      return false;
    }
    return true;
  }

  function isValidLength(type, limit) {
    let length = formState[type].length;
    if (length > 0 && length < limit) {
      return false;
    }
    return true;
  }

  return (<>
    <Drawer anchor={'top'} open={props.open} onClose={() => props.close(false)}>

      <Container component="main" maxWidth="md">
        <h2 style={{ textAlign: 'center', color: '#2196F3', marginTop: 32 }} >
          <FormatListNumberedOutlinedIcon style={{ position: 'relative', top: 4, marginRight: 4 }} />
        New budget form </h2>
        <div style={{ display: 'flex', flexFlow: 'column', marginBottom: 78 }}>
          <TextField
            variant="outlined"
            margin="normal"
            id="Budget title"
            error={isValidLength('title', 60)}
            helperText={'Max 60 characters.'}
            label="Budget title"
            name="email"
            onChange={(evt) => onChange('title', evt.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="description"
            error={isValidLength('description', 100)}
            helperText={'Max 100 characters.'}
            label="Short description"
            name="Short description"
            onChange={(evt) => onChange('description', evt.target.value)}
          />

          <div className='add__budget__fieldswrapper'>
            <FormControl variant="outlined" className='add__budget__select' >
              <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
              <Select
                labelId="currency"
                id="currency"
                label="Currency"
                value={formState.currency}
                onChange={(evt) => onChange('currency', evt.target.value)}
              >
                <MenuItem value={'uk'}> £ UK Pound</MenuItem>
                <MenuItem value={'us'}> $ US Dollar</MenuItem>
                <MenuItem value={'eu'}> € EU Euro</MenuItem>
              </Select>
            </FormControl>

            <TextField
              className='add__budget__number'
              id="standard-number"
              margin="normal"
              variant='outlined'
              error={isValidTotal()}
              helperText={'99 Millions is the max amount. Total must be a positive number.'}
              label="Budget available value"
              type="number"
              value={formState.total}
              onChange={(evt) => onChange('total', evt.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <span> <InfoOutlinedIcon style={{ color: '#2196F3', position: 'relative ', top: 6 }} /> All the fields have to be filled in order to be able to submit the form.  </span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button style={{ margin: 16, width: 150 }} variant="outlined" size='large' onClick={() => props.close(false)} > Cancel </Button>
            <Button disabled={isValid() ? false : true} style={{ margin: 16, width: 150  }} variant="outlined" size='large' color="primary" onClick={addBudget} > Add </Button>
            
          </div>
        </div>
      </Container>
    </Drawer>
  </>);
}

const UserDashboard = (props) => {
  const { dispatch, user } = props;
  let [showForm, setShowForm] = React.useState(false);

  function removeBudgetAction(docid) {
    dispatch(removeBudget(docid));
  }

  function addBudgetAction(fbobj) {
    dispatch(addBudget(fbobj));
  }

  useEffect(() => {
    dispatch(fetchBudgets());
  }, []);

  let userName = user.displayName;

  return (<div className='dashboard__wrapper' >
    <h1 style={{ color: '#fff' }}> <DashboardIcon style={{ fontSize: 36, color: '#f25e7f', position: 'relative', top: 5 }} /> Dashboard. {userName ? `Hi, ${userName}` : null} </h1>
    <p style={{ color: '#fff' }}>  Inspect, Create, Amend, Delete your budgets. </p>
    {false && <div className='show__desktop__only' style={{ width: '100%', textAlign: 'center', height: 50, marginTop: 60, marginBottom: 30 }}> Some of my comercials banners </div>}
    <div className='dashboard__content'>

      <SelectedBudget
        dispatch={dispatch}
        loading={props.loading}
        budgets={props.budgets}
        selectedBudgetFromStore={props.selectedBudget}
        showForm={showForm}
        setShowForm={setShowForm}
      />

      <BudgetsList
        showForm={showForm}
        setShowForm={setShowForm}
        dispatch={dispatch}
        addBudgetAction={addBudgetAction}
        loading={props.loading}
        removeBudgetAction={removeBudgetAction}
        budgets={props.budgets}
      />
      <BuddgetForm addBudgetAction={addBudgetAction} open={showForm} close={() => { setShowForm(false) }} />
    </div>
    {false && <div style={{ width: '100%', textAlign: 'center', height: 50, marginTop: 60 }}> Some of my comercials banners </div>}
  </div>);
};

const mapStateToProps = (state) => {
  return {
    budgets: state.budgets.budgets,
    loading: state.budgets.loading,
    selectedBudget: state.budgets.selectedBudget,
    error: state.budgets.error
  };
};

export default connect(mapStateToProps)(UserDashboard);
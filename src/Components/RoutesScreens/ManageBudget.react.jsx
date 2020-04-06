import './managebudget.scss';
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Container, Button, TextField } from '@material-ui/core';
import Currency from '../Currency';
import Loader from '../Loader';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addEntry } from '../../actions/budgets';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import TitleIcon from '@material-ui/icons/Title';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffOutlinedIcon from '@material-ui/icons/MoneyOffOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


function ManageBudget(props) {

  const [checked, setChecked] = React.useState(true);
  const [formState, setFormState] = React.useState({type: 'add', description: ' ', value: '0', error: false, errorMsg: ''});

  let sb = props.selectedBudget;
  let loading = props.loading;
  let {dispatch} = props;
  let entries = sb?.entries;

  let prepEntries = [];

  if(entries && entries.length > 0) {
    prepEntries = entries.map((el, key)=>{
      return (<div  className='entry__item__cont'  key={key}>  
                            <div className='entry__item__deep'>  {`${key + 1}. Entry added:`} <span style={{ marginRight: 8, color: '#2196F3'}}>{moment.unix(el.created / 1000).format('Do MM YYYY hh:mm')}</span></div> 
                            <div className='entry__item__deep'>  Description: <span style={{ marginRight: 8, color: '#2196F3', wordBreak: 'break-all'}} >{el.description} </span> </div> 
                            <div className='entry__item__deep'>  Value: <span style={{ marginRight: 8, color: '#2196F3'}}>  <Currency currency={sb.currency} /> {Number(el.value).toFixed(2)}</span> </div> 
              </div>);
    });
  }

  function onChange(vt, v) {
    setFormState({...formState, [vt]: v});
  }

  function isValidLength(type, limit) {
    let length = formState[type].length;
    if (length > 0 && length < limit) {
      return false;
    }
    return true;
  }


  function onAdd() {

     let objts = sb;

     objts.updateddate = new Date();

    setFormState({...formState, error: false});
 
    if(formState.type === 'add') {
      objts.progress = Number(objts.progress) + Number(formState.value);
     }

     objts.entries = sb.entries.concat([{created: moment().format('x'), type: formState.type, value: Number(formState.value).toFixed(2), description: formState.description }]);

     dispatch(addEntry(objts));

  }

  function isValidTotal() {

    let value = Number(formState.value);

    if (value >= 0 && value < (2 * Number(sb.total) - Math.abs(sb.progress))) {

      return false;
    }
    return true;
  }

  return (
    <>
      <h1 style={{ color: '#fff' }}> <DataUsageIcon style={{ fontSize: 36, color: '#f25e7f', position: 'relative', top: 5 }} /> Manage {sb?.title ? sb.title : 'budget'}.  </h1>
      <p style={{ color: '#fff' }}>  Inspect, Amend, Delete your selected budget. </p>
      {false && <div className='show__desktop__only' style={{ width: '100%', textAlign: 'center', height: 50, marginTop: 60, marginBottom: 0 }}> Some of my comercials banners </div>}

      {!sb && <div style={{ display: 'flex', marginBottom: 100, flexFlow: 'column', height: 200, width: '100%', justifyContent: 'center', alignItems: 'center ' }}>
        <h2 style={{ color: '#fff' }}> Nothing here? You must be lost ...   </h2>
        <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/userhome'}>
          <Button size='large' variant="outlined" className={'current__budget__button current__budget__button--back'} >
            <ArrowBackIcon /> Back To Dashboard
                  </Button>
        </Link>
      </div>}
      {!loading && sb && <div className='current__budgetselected__wrapper'>
        <Grow in={checked}>
          <Paper elevation={4} className='current__budgetselected__paper' >
            <Container className={`current__budget__content`} style={{ display: 'flex' }} maxWidth="md">
              {<div style={{ width: '100%' }}>
                <h2 style={{ color: '#2196f3', marginTop: 0 }}>
                  <CalendarViewDayOutlinedIcon style={{ marginRight: 8, color: '#2196f3', position: 'relative', top: 4 }} />
                  {'Manage budget entries'}
                </h2>
                <p> <AttachMoneyIcon style={{ color: 'green' }} /> Budget value: <span> <Currency currency={sb.currency} /> {Number(sb.total).toFixed(2)}</span></p>
                <p> <TitleIcon />  Budget title: <span> {sb.title}</span>  </p>
                <p> <DescriptionOutlinedIcon /> Description: <span>{sb.description}</span>  </p>
                <p> <MoneyOffOutlinedIcon /> Total spent: <span>  <Currency currency={sb.currency} /> {Math.abs(sb.progress).toFixed(2)} </span> </p>
                <p> <AttachMoneyIcon style={{ color: 'green' }} /> Available to spend: <span> <Currency currency={sb.currency} />{` ${Number(Number(sb.total).toFixed(2) - Math.abs(sb.progress).toFixed(2)).toFixed(2)}`}</span> </p>
                <p> <EventAvailableIcon /> Created: <span>{moment.unix(sb.createddate.seconds).format("DD MMM YYYY")}</span></p>
                <div className='add__entry__wrapper'>
                <TextField
              className='add__entry__value'
              id="standard-number-value"
              margin="normal"
              variant='outlined'
              error={isValidTotal()}
              helperText={'The value must be a positive number.'}
              label="The value of the entry"
              type="number"
              value={formState.value}
              onChange={(evt) => onChange('value', evt.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
            variant="outlined"
            margin="normal"
            id="description"
            className='add__entry__desc'
            error={isValidLength('description', 100)}
            helperText={'Max 100 characters.'}
            label="Short description"
            name="Short description"
            onChange={(evt) => onChange('description', evt.target.value)}
          />

          {false && <FormControl variant="outlined" className='add__entry__type'>
            <InputLabel id="demo-simple-select-outlined-label">Add/Subtract</InputLabel>
              <Select
                labelId="AddSubtract<"
                id="AddSubtract<"
                label="Add/Subtract<"
                value={formState.type}
                onChange={(evt) => onChange('type', evt.target.value)}
              >
                <MenuItem value={'add'}>  Add </MenuItem>
                <MenuItem value={'remove'}> Subtract </MenuItem>
              </Select>
            </FormControl>}
                  <Button size='large' variant="outlined" disabled={(isValidTotal() || isValidLength('description', 100))} 
                    onClick={onAdd}
                   >
                    {(!isValidTotal() && !isValidLength('description', 100)) ? <AddIcon style={{ fontSize: 16, marginRight: 6, color: '#4BB543' }} /> : <span style={{color: 'grey', fontSize: 12, position: 'relative', left: -6}}> Invalid </span>}
                  </Button>
                </div>
                {prepEntries.length > 0 && prepEntries}
                <div className='current__budget__button__wrapper'>
                  <Link style={{ textDecoration: 'none' }} to={'/userhome'}>
                    <Button size='large' variant="outlined" style={{marginBottom: 32}} className={'current__budget__button'} >
                      <ArrowBackIcon style={{ position: 'relative' }} /> Back To Dashboard
                  </Button>
                  </Link>
                </div>
              </div>}
            </Container>
          </Paper>
        </Grow>
      </div>}
      {loading && <Loader />}
      {false && <div style={{ width: '100%', textAlign: 'center', height: 50, marginTop: 60, marginBottom: 30 }}> Some of my comercials banners </div>}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    user: state.auth.user,
    selectedBudget: state.budgets.selectedBudget,
    loading: state.budgets.loading
  };
}

export default connect(mapStateToProps)(ManageBudget);
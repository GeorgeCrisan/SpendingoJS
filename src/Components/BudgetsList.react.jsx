import React, { useEffect } from 'react';
import { Container, Button, Paper, TextField } from '@material-ui/core';
import Loader from './Loader';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
//import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Drawer from '@material-ui/core/Drawer';
import { selectedBudget } from '../actions/budgets';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Currency from './Currency';
import MyAccount from './MyAccount.react';

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
        <div style={{ display: 'flex', flexFlow: 'column' }}>
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
          <Button style={{ marginTop: 16 }} variant="outlined" size='large' onClick={() => props.close(false)} > Cancel </Button>
          <Button disabled={isValid() ? false : true} style={{ marginTop: 16, marginBottom: 16 }} variant="outlined" size='large' color="primary" onClick={addBudget} > Add </Button>
        </div>
      </Container>
    </Drawer>
  </>);
}


export default function BudgetsList(props) {
  let [showForm, setShowForm] = React.useState(false);
  var [maopen, setMaOpen] = React.useState(false);

  let budgets = [];
  if (props.budgets) {
    budgets = props.budgets.map((el, i) => {

      return (<div key={i + 1} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        <Link style={{ textDecoration: 'none', width: '100%' }} to={'/managebudget'} onClick={() => { props.dispatch(selectedBudget(el)); }}>
          <Button size='large' variant="outlined" className={'current__budget__button current__budget__button--expanded defaultblue'}>
            <div>
              <div style={{ display: 'flex' }}>
                <span style={{ color: '#555', marginRight: 8 }}>{`${i + 1}.`}</span>
                <span style={{ color: '#2196F3', textTransform: 'capitalize' }} >{`${el.title}`}</span>
              </div>
              <div style={{ color: '#555', fontSize: 12, textTransform: 'capitalize', display: 'flex', justifyContent: 'flex-start' }} >
                <div style={{ display: 'inline-flex', marginLeft: 0, flexFlow: 'row wrap' }}> <span>Created:</span> <span style={{ color: '#2196F3', marginRight: 2, marginLeft: 4, display: 'inline' }}>{moment.unix(el.createddate.seconds).format("DD MMM YY")} </span> </div>
                <div style={{ display: 'inline', marginLeft: 4 }}> Entries:<span style={{ color: '#2196F3', marginRight: 2 }}> {el.entries.length} </span> </div>
              </div>
              <div style={{ display: 'block', textAlign: 'left', marginRight: 'auto', color: '#555' }} > Available: <span style={{ color: '#2196F3', marginRight: 2 }}> {Number(Number(el.total) - Math.abs(el.progress)).toFixed(2)}{<Currency currency={el.currency} />}  </span> </div>
            </div>
          </Button>
        </Link>
        <DeleteForeverOutlinedIcon onClick={() => { props.removeBudgetAction(el.docid) }} style={{ cursor: 'pointer', alignSelf: 'center', color: 'rgba(242, 94, 127 , 0.8)', marginLeft: 16, marginTop: 16 }} />
      </div>);

    });
  }


  return (<>
  <div className='budgetlist__wrapper' style={{ display: 'flex', flexFlow: 'column' }}>
    <div className='show__mobile__only' style={{ width: '100%', marginBottom: 32 }}>
      <Button size='large' variant="outlined"
        onClick={() => { if (budgets && budgets.length < 10) { setShowForm(!showForm); } }}
        className={'current__budget__button current__budget__button--expanded'} >
        <AddIcon style={{ fontSize: 16, marginRight: 6, color: '#4BB543' }} />
        <span style={{ color: '#fff' }} > {budgets && budgets.length >= 10 ? 'Max of 10 reached!' : 'Add new budget'}</span>
      </Button>
    </div>
    <Paper elevation={4} className='budgetlist__container'>
      <h2 style={{ color: '#2196F3', lineHeight: '2em', borderBottom: '2px  dashed #2196f3 ', marginLeft: 16, marginRight: 16 }}>
        <FormatListNumberedOutlinedIcon style={{ position: 'relative', top: 4 }} /> Budgets list
      </h2>

      <Container>
        {budgets && budgets.length > 0 && <div>
          {budgets}
        </div>}
        {(!budgets || budgets && budgets.length === 0) &&
          <h2 style={{ paddingTop: 16, marginTop: 100, borderBottom: 'none', color: '#2196F3', lineHeight: '2.2' }}>
            <InfoOutlinedIcon style={{ fontSize: 36, position: 'relative', top: 10, right: 6 }} />
              No budgets created yet. What are you waiting for?
            </h2>}
        {props.loading && <div style={{ padding: 32, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </div>}
      </Container>
    </Paper>
    <div className='show__desktop__only' style={{ width: '100%' }}>
      <Button size='large' variant="outlined"
        onClick={() => { if (budgets && budgets.length < 10) { setShowForm(!showForm); } }}
        className={'current__budget__button current__budget__button--expanded'} >
        <AddIcon style={{ fontSize: 16, marginRight: 6, color: '#4BB543' }} />
        <span style={{ color: '#fff' }} > {budgets && budgets.length >= 10 ? 'Max of 10 reached!' : 'Add new budget'}</span>
      </Button>
    </div>
    <BuddgetForm addBudgetAction={props.addBudgetAction} open={showForm} close={() => { setShowForm(false) }} />
    <div className='show__mobile__only' style={{ width: '100%', marginTop: 16 }}>
      <Button size='large' variant="outlined" onClick={() => {console.log(maopen); setMaOpen(true);}} className={'current__budget__button current__budget__button--expanded'} >
        <EditIcon style={{ fontSize: 16, marginRight: 6, color: '#2196F3' }} /> Manage Account
                </Button>
    </div>
    {maopen && <MyAccount maopen={maopen} onClose={()=>setMaOpen(false)} />}
  </div>
  </>);
};
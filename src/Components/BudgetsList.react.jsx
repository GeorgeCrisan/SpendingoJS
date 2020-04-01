import React, {useEffect} from 'react';
import { Container, Button, Paper, TextField } from '@material-ui/core';
import Loader from './Loader';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
//import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Drawer from '@material-ui/core/Drawer';

function BuddgetForm(props) {

  var [formState, setFormState] = React.useState({currency: 'uk', title: false, description: false, total: false});

  function addBudget() {
    console.log('added budget', formState);
    let objTS = {...formState};

    objTS.createddate = new Date();
    objTS.progress = '0';
    objTS.entries = [];
    objTS.finalized = false;


    props.addBudgetAction(objTS);
    props.close(false);
  }

  function isValid() {
    return ((formState.title  && formState.title.length > 2) &&
            (formState.total && formState.total.length > 1) &&
            (formState.description && formState.description.length > 2));
  }


  function onChange(type, value) {
    setFormState({...formState, [type]: value});
  }

  useEffect(()=>{
   
  },[formState]);

  

  return (<>
    <Drawer anchor={'top'} open={props.open} onClose={() => props.close(false)}>

      <Container component="main" maxWidth="md">
        <h2 style={{textAlign: 'center', color: '#2196F3', marginTop: 32}} > 
        <FormatListNumberedOutlinedIcon style={{ position: 'relative', top: 4, marginRight: 4  }} />
        New budget form </h2>
        <div style={{display: 'flex', flexFlow: 'column'}}>
          <TextField
            variant="outlined"
            margin="normal"
            id="Budget title"
            error={false}
            helperText={''}
            label="Budget title"
            name="email"
            onChange={(evt) => onChange('title', evt.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="description"
            error={false}
            helperText={''}
            label="Short description"
            name="Short description"
            onChange={(evt) => onChange('description', evt.target.value)}
          />
            <TextField
          id="standard-number"
          margin="normal"
          error={false}
          label="Budget available value"
          type="number"
          onChange={(evt) => onChange('total', evt.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
          <span> <InfoOutlinedIcon style={{color: '#2196F3', position: 'relative ', top: 6}} /> All the fields have to be filled in order to be able to submit the form. </span>
          <Button style={{marginTop: 16}} variant="outlined" size='large' onClick={() => props.close(false)} > Cancel </Button>
          <Button disabled={isValid() ? false : true } style={{marginTop: 16, marginBottom: 16}} variant="outlined" size='large' color="primary" onClick={addBudget} > Add </Button>
        </div>
</Container>
    </Drawer>
  </>);
}

export default function BudgetsList(props) {
  let [showForm, setShowForm] = React.useState(false);

  let budgets = [];
  if (props.budgets) {
    budgets = props.budgets.map((el, i) => {

      return (<div key={i + 1} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        <Button size='large' variant="outlined" className={'current__budget__button current__budget__button--expanded defaultblue'}>
          <div>
            <div style={{ display: 'flex' }}>
              <span style={{ color: '#2196F3', marginRight: 8 }}>{`${i + 1}.`}</span>
              <span style={{ color: '#555', textTransform: 'capitalize' }} >{`${el.title}`}</span>
            </div>
            <div style={{ color: '#555', fontSize: 12, textTransform: 'capitalize' }} > <span style={{ color: '#2196F3', marginRight: 2 }} > Created:</span> {moment.unix(el.createddate.seconds).format("DD MMM YYYY")}  </div>
          </div>
        </Button>
        <DeleteForeverOutlinedIcon onClick={()=>{props.removeBudgetAction(el.docid)}} style={{ cursor: 'pointer', alignSelf: 'center', color: '#2196F3', marginLeft: 16, marginTop: 16 }} />
      </div>);

    });
  }


  return (<div className='budgetlist__wrapper' style={{ display: 'flex', flexFlow: 'column' }}>
    <Paper elevation={4} className='budgetlist__container'>
      <h2 style={{ color: '#2196F3', lineHeight: '2em', borderBottom: '2px  dashed #2196f3 ', marginLeft: 16, marginRight: 16 }}>
        <FormatListNumberedOutlinedIcon style={{ position: 'relative', top: 4 }} /> Budgets list
      </h2>

      <Container>
        {budgets && budgets.length > 0 && <div>
          {budgets}
        </div>}
        {!budgets && <div>
          No budgets found meesage
          </div>}
        {props.loading && <div style={{padding: 32, width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Loader />
          </div>}
      </Container>
    </Paper>
    <div style={{ width: '100%' }}>
      <Button size='large' variant="outlined"
        onClick={() => { if(budgets && budgets.length < 10) { setShowForm(!showForm); } }}
        className={'current__budget__button current__budget__button--expanded'} >
        <AddIcon style={{ fontSize: 16, marginRight: 6, color: '#4BB543' }} />
        <span style={{ color: '#fff' }} > {budgets && budgets.length >= 10 ? 'Max of 10 reached!' :  'Add new budget'}</span>
      </Button>
    </div>
    <BuddgetForm addBudgetAction={props.addBudgetAction} open={showForm} close={() => { setShowForm(false) }} />
  </div>
  );
};
import React from 'react';
import { Container, Button } from '@material-ui/core';
import Loader from './Loader';
import AddIcon from '@material-ui/icons/Add';

export default function BudgetsList(props) {

  var budgets = props.budgets;

  return (<div className='budgetlist__wrapper' style={{display: 'flex', flexFlow: 'column'}}> 
    <div className='budgetlist__container'>

      <h2> Budgets list</h2>
      <Container>
        {budgets && <div>
          Current Budget data list
        </div>}
        {!budgets && <Loader />}
      </Container>
    </div>
    <div style={{ width: '100%' }}>
      <Button size='large' variant="outlined" onClick={() => { }} className={'current__budget__button current__budget__button--expanded success'} >
      <AddIcon style={{fontSize: 16, marginRight: 6 , color: '#4BB543'}} /> <span style={{color: '#4BB543'}} > Add new budget</span>
    </Button>
    </div>
  </div>
  );
};
import React from 'react';
import { Container, Button , Paper } from '@material-ui/core';
import Loader from './Loader';
import AddIcon from '@material-ui/icons/Add';
//import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';

export default function BudgetsList(props) {


  let budgets = [];
  if(props.budgets) {
    budgets = props.budgets.map((el,i)=>{

      return (<div key={i + 1} style={{display: 'flex', flexFlow: 'row nowrap'}}>
          <Button  size='large' variant="outlined"  className={'current__budget__button current__budget__button--expanded defaultblue'}> 
          <div>
            <div><span style={{color: '#2196F3'}}> {`${i+1}.`} </span> <span style={{ color: '#555'}} > {`${el.title}`}  </span></div>
            <div> temps  </div>
          </div>
          </Button>
          <DeleteForeverOutlinedIcon onClick={props.deleteBudget} style={{cursor: 'pointer', alignSelf: 'center', color: '#2196F3', marginLeft: 16, marginTop: 16}} />
        </div>);
        
    });
  }
  

  return (<div className='budgetlist__wrapper' style={{display: 'flex', flexFlow: 'column'}}> 
    <Paper elevation={4} className='budgetlist__container'>
      <h2 style={{color: '#2196F3', lineHeight: '2em', borderBottom: '2px  dashed #2196f3 ', marginLeft: 16, marginRight: 16}}>
        <FormatListNumberedOutlinedIcon style={{position: 'relative', top: 4}}/> Budgets list
      </h2>

      <Container>
        {budgets && budgets.length > 0 && <div>
          {budgets}
        </div>}
        {!budgets && <div>
            No budgets found meesage
          </div>}
        {props.loading && <Loader />}
      </Container>
      </Paper>
    <div style={{ width: '100%' }}>
      <Button size='large' variant="outlined" onClick={() => { }} className={'current__budget__button current__budget__button--expanded'} >
      <AddIcon style={{fontSize: 16, marginRight: 6 , color: '#4BB543'}} /> <span style={{color: '#fff'}} > Add new budget</span>
    </Button>
    </div>
  </div>
  );
};
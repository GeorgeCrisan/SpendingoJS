import React, { useEffect } from 'react';
import { Container, Button, Paper, TextField } from '@material-ui/core';
import Loader from './Loader';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { selectedBudget } from '../actions/budgets';
import Currency from './Currency';
import MyAccount from './MyAccount.react';


export default function BudgetsList(props) {
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
              <div style={{ color: '#555', fontSize: 14, textTransform: 'capitalize', display: 'flex', justifyContent: 'flex-start' }} >
                <div style={{ display: 'inline-flex', marginLeft: 0, flexFlow: 'row wrap' }}> <span>Created:</span> <span style={{ color: '#2196F3', marginRight: 2, marginLeft: 4, display: 'inline' }}>{moment.unix(el.createddate.seconds).format("DD MMM YY")} </span> </div>
                <div style={{ display: 'inline', marginLeft: 4 }}> Entries:<span style={{ color: '#2196F3', marginRight: 2 }}> {el.entries.length} </span> </div>
              </div>
              <div style={{ display: 'block', textAlign: 'left', marginRight: 'auto', color: '#555', fontSize: 14 }} > Available: <span style={{ color: '#2196F3'}}> <Currency currency={el.currency} />{` ${Number(Number(el.total) - Math.abs(el.progress)).toFixed(2)}`} </span> </div>
            </div>
          </Button>
        </Link>
        <DeleteForeverOutlinedIcon onClick={() => { props.removeBudgetAction(el.docid) }} style={{ cursor: 'pointer', alignSelf: 'center', color: 'rgba(242, 94, 127 , 0.8)', marginLeft: 16, marginTop: 16 }} />
      </div>);

    });
  }


  return (<>
  <div className='budgetlist__wrapper' style={{ display: 'flex', flexFlow: 'column' }}>
    <div className='show__mobile__only mobile__fixed__add' style={{ width: '100%', marginBottom: 32 }}>
      <Button size='large' variant="outlined"
        onClick={() => { if (budgets && budgets.length < 10) { props.setShowForm(!props.showForm); } }}
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
        onClick={() => { if (budgets && budgets.length < 10) { props.setShowForm(!props.showForm); } }}
        className={'current__budget__button current__budget__button--expanded'} >
        <AddIcon style={{ fontSize: 16, marginRight: 6, color: '#4BB543' }} />
        <span style={{ color: '#fff' }} > {budgets && budgets.length >= 10 ? 'Max of 10 reached!' : 'Add new budget'}</span>
      </Button>
    </div> 
    <div className='show__mobile__only' style={{ width: '100%', marginTop: 16, marginBottom: 60 }}>
      <Button size='large' variant="outlined" onClick={() => {console.log(maopen); setMaOpen(true);}} className={'current__budget__button current__budget__button--expanded'} >
        <EditIcon style={{ fontSize: 16, marginRight: 6, color: '#2196F3' }} /> Manage Account
                </Button>
    </div>
    {maopen && <MyAccount maopen={maopen} onClose={()=>setMaOpen(false)} />}
  </div>
  </>);
};
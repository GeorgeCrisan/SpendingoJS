import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Container, Button } from '@material-ui/core';
import Currency from './Currency';
import Loader from './Loader';
import moment from 'moment';
import {Link } from 'react-router-dom';
import {selectedBudget} from '../actions/budgets';
import './selectedbudget.scss';
import NotesIcon from '@material-ui/icons/Notes';
import EditIcon from '@material-ui/icons/Edit';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import TitleIcon from '@material-ui/icons/Title';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffOutlinedIcon from '@material-ui/icons/MoneyOffOutlined';
import MyAccount from './MyAccount.react';

export default function SelectedBudget(props) {

  const [checked, setChecked] = React.useState(true);
  let [maOpen, setMaOpen] = React.useState(null);

  let sb = props?.selectedBudgetFromStore ? props.selectedBudgetFromStore : props.budgets[0];
  let loading = props.loading;
  let available = 0;
   
  if(sb) {
    available = Number(Number(sb.total).toFixed(2) - Math.abs(sb.progress).toFixed(2)).toFixed(2);
  }
   
  return (
    <>
      {!loading && <div className='current__budget__wrapper'>
        <Grow in={checked}>
          <Paper elevation={4} style={{overflow: 'auto', height: 483, display: 'flex'}} >
            <Container className={`current__budget__content`} style={{display: 'flex'}} maxWidth="md">
              {sb && <div style={{width: '100%'}}>
                <h2 style={{color: '#2196f3',marginTop: 0 }}>
                   <CalendarViewDayOutlinedIcon style={{marginRight: 8, color: '#2196f3', position: 'relative', top: 4}} />
                   {!props.selectedBudgetFromStore ? 'Latest Budget' : 'Selected Budget'}
                </h2>
                <p> <AttachMoneyIcon style={{color: 'green'}} /> Budget Value: <span> <Currency currency={sb.currency} /> {Number(sb.total).toFixed(2)}</span> </p>
                <p> <TitleIcon />  Budget title: <span> {sb.title}</span>  </p>
                <p> <DescriptionOutlinedIcon /> Description: <span>{sb.description}</span>  </p>
                <p> <MoneyOffOutlinedIcon /> Total spent: <span><Currency currency={sb.currency} /> {Math.abs(sb.progress).toFixed(2)}</span> </p>
                <p> <AttachMoneyIcon style={{color: 'green'}} /> Available to spend: 
                  <span><Currency currency={sb.currency} />{` ${available}`}</span>
                  {available < 0 && <span style={{color: 'red'}}> overspent </span>}
                  </p>
                {false && <p> <EventAvailableIcon /> Created: <span>{moment.unix(sb.createddate.seconds).format("DD MMM YYYY")}</span> </p>}

                <div className='current__budget__button__wrapper'>
                    <Link onClick={()=>{props.dispatch(selectedBudget(sb))}} style={{textDecoration: 'none'}} to="/managebudget" >
                      <Button size='large' variant="outlined" className={'current__budget__button'} >
                        Manage
                    </Button>
                  </Link>
                </div>
              </div>}
              {!sb && <div onClick={()=>{props.setShowForm(!props.showForm);}} style={{display: 'flex', flexFlow: 'column',  alignItems: 'center', cursor: 'pointer', justifyContent: 'center' }}>
                <h2 style={{alignSelf: 'center', paddingTop: 16, borderBottom: 'none', color: '#2196F3' }}> <NotesIcon style={{ fontSize: 40, position: 'relative', top: 12, right: 4 }} />
                  Please create a budget. Soon as budget is created, relevant data is displayed here.
                </h2>
              </div>}
            </Container>
          </Paper>
        </Grow>
        <div className='show__desktop__only' style={{ width: '100%' }}>
          <Button size='large' variant="outlined" onClick={() => { setMaOpen(true)}} className={'current__budget__button current__budget__button--expanded'} >
            <EditIcon style={{ fontSize: 16, marginRight: 6, color: '#2196F3'}} /> Manage Account
                </Button>
        </div>
        {maOpen && <MyAccount maopen={maOpen} onClose={()=>{setMaOpen(false)}} />}
      </div>}
      {loading && <Loader />}
    </>
  );
};
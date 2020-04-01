import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Container, Button } from '@material-ui/core';
import Currency from './Currency';
import Loader from './Loader';
import moment from 'moment';

import './selectedbudget.scss';
import NotesIcon from '@material-ui/icons/Notes';
import EditIcon from '@material-ui/icons/Edit';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';


export default function SelectedBudget(props) {

  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 400);
  }, []);

  useEffect(() => {
    props.setSelectedBudget({ selectedBudget: props.budgets[0], userSelected: false });
  }, [props.budgets]);

  let sb = props.selectedBudget.selectedBudget;
  let loading = props.loading;

  return (
    <>
      {!loading && <div className='current__budget__wrapper'>
        <Grow in={checked}>
          <Paper elevation={4} style={{overflow: 'scroll', height: 483, display: 'flex'}} >
            <Container className={`current__budget__content`} style={{display: 'flex'}} maxWidth="md">
              {sb && <div>
                <h2 style={{color: '#2196f3',marginTop: 0 }}>
                   <CalendarViewDayOutlinedIcon style={{marginRight: 8, color: '#2196f3', position: 'relative', top: 4}} />
                   {!props.selectedBudget.userSelected ? 'Latest Budget' : 'Selected Budget'}
                </h2>
                <p>  Budget title: <span> {sb.title}</span>  </p>
                <p> Description: <span>{sb.description}</span>  </p>
                <p> Total funds: <span>{sb.total}</span><Currency currency={sb.currency} /> </p>
                <p> Total spent: <span>{sb.progress}<Currency currency={sb.currency} /></span> </p>
                <p> Available to spend: <span>{`${sb.total - sb.progress}`}<Currency currency={sb.currency} /></span> </p>
                <p>  Created: <span>{moment.unix(sb.createddate.seconds).format("DD MMM YYYY")}</span></p>
                <div className='current__budget__button__wrapper'>
                  <Button size='large' variant="outlined" className={'current__budget__button'} >
                    Manage
                  </Button>
                </div>
              </div>}
              {!sb && <div style={{display: 'flex', flexFlow: 'column',  alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{alignSelf: 'center', paddingTop: 16, borderBottom: 'none', color: '#2196F3' }}> <NotesIcon style={{ fontSize: 40, position: 'relative', top: 12, right: 4 }} />
                  Please create a budget. Soon as budget is created, relevant data is displayed here.
                </h2>
              </div>}
            </Container>
          </Paper>
        </Grow>
        <div className='show__desktop__only' style={{ width: '100%' }}>
          <Button size='large' variant="outlined" onClick={() => { }} className={'current__budget__button current__budget__button--expanded'} >
            <EditIcon style={{ fontSize: 16, marginRight: 6, color: '#2196F3'}} /> Manage Account
                </Button>
        </div>
      </div>}
      {loading && <Loader />}
    </>
  );
};
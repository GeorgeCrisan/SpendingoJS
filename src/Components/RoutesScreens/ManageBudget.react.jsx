import './managebudget.scss';
import React ,{ useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Container, Button } from '@material-ui/core';
import Currency from '../Currency';
import Loader from '../Loader';
import moment from 'moment';
import {connect} from 'react-redux';

import NotesIcon from '@material-ui/icons/Notes';
import EditIcon from '@material-ui/icons/Edit';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import TitleIcon from '@material-ui/icons/Title';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffOutlinedIcon from '@material-ui/icons/MoneyOffOutlined';

function ManageBudget(props) {
  let [localBudget, setLocalBudget] = useState({});
  const [checked, setChecked] = React.useState(false);
  let sb = props.sb;
  let loading = props.loading;
  return (
    <>
      {!loading && sb && <div className='current__budget__wrapper'>
        <Grow in={checked}>
          <Paper elevation={4} style={{overflow: 'scroll', height: 483, display: 'flex'}} >
            <Container className={`current__budget__content`} style={{display: 'flex'}} maxWidth="md">
              { <div style={{width: '100%'}}>
                <h2 style={{color: '#2196f3',marginTop: 0 }}>
                   <CalendarViewDayOutlinedIcon style={{marginRight: 8, color: '#2196f3', position: 'relative', top: 4}} />
                   {'Some data budget title'}
                </h2>
                <p> <TitleIcon />  Budget title: <span> {sb.title}</span>  </p>
                <p> <DescriptionOutlinedIcon /> Description: <span>{sb.description}</span>  </p>
                <p> <AttachMoneyIcon style={{color: 'green'}} /> Total funds: <span>{sb.total}</span><Currency currency={sb.currency} /> </p>
                <p> <MoneyOffOutlinedIcon /> Total spent: <span>{sb.progress}<Currency currency={sb.currency} /></span> </p>
                <p> <AttachMoneyIcon style={{color: 'green'}} /> Available to spend: <span>{`${sb.total - sb.progress}`}<Currency currency={sb.currency} /></span> </p>
                <p> <EventAvailableIcon /> Created: <span>{moment.unix(sb.createddate.seconds).format("DD MMM YYYY")}</span></p>
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
      </div>}
      {loading && <Loader />}
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
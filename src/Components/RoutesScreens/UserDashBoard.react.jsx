import React, {useEffect} from 'react';
import {fetchBudgets} from '../../actions';
import './userdashboard.scss';
import {connect} from 'react-redux';

//Components

import BudgetsPanel from '../BudgetsPanel.react';

const UserDashboard = (props) => {
  
  useEffect(()=>{
    const { dispatch } = props;
    dispatch(fetchBudgets());
    console.log(props);
  },[]);
  console.log(props);
  return (<div className='dashboard__wrapper' >
      <h1>Temp div </h1>
      <p> Short description </p>
      <BudgetsPanel />
     </div>);
};

const mapStateToProps = (state) => {
  return { 
    budgets: state.budgets.budgets,
    error: state.budgets.error
  };
};

export default connect(mapStateToProps)(UserDashboard);
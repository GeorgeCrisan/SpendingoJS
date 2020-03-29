import React, {useEffect} from 'react';
import {fetchBudgets} from '../../actions';
import './userdashboard.scss';
import {connect} from 'react-redux';

import DashboardIcon from '@material-ui/icons/Dashboard';

//Components

import SelectedBudget from '../SelectedBudget.react';
import BudgetsList from '../BudgetsList.react';

const UserDashboard = (props) => {
  
  let [slectedState, setSelectedState] = React.useState({
    userSelected: false,
    selectedBudget: false
  });

  useEffect(()=>{
    const { dispatch } = props;
    if(props.budgets.length === 0) {
      dispatch(fetchBudgets());
    }
    if(props.budgets && props.budgets.length > 0 ) {
      setSelectedState({userSelected: false, selectedBudget: props.budgets[0]});
    }
  },[props.budgets]);

  return (<div className='dashboard__wrapper' >
      <h1 style={{color: '#fff'}}> <DashboardIcon style={{fontSize: 36, color: '#f25e7f', position: 'relative', top: 5}} /> Dashboard.  </h1>
      <p style={{color: '#fff'}}>  Inspect, Create, Amend, Delete your budgets. </p>
      <div style={{border:'1px solid #fff', width: '100%', textAlign: 'center', height: 50}}> Some of my comercials banners </div>
      <div className='dashboard__content'>
        <SelectedBudget selectedBudget={slectedState}/>
        <BudgetsList budgets={props.budgets} />
      </div>
     </div>);
};

const mapStateToProps = (state) => {
  return { 
    budgets: state.budgets.budgets,
    error: state.budgets.error
  };
};

export default connect(mapStateToProps)(UserDashboard);
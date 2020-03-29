import React, {useEffect} from 'react';
import {fetchBudgets} from '../../actions';
import './userdashboard.scss';
import {connect} from 'react-redux';

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
    if(props.budgets.length == 0) {
      dispatch(fetchBudgets());
    }
    if(props.budgets && props.budgets.length > 0 ) {
      setSelectedState({userSelected: false, selectedBudget: props.budgets[0]});
    }
  },[props.budgets]);

  return (<div className='dashboard__wrapper' >
      <h1>Temp div </h1>
      <p> Short description </p>
      <SelectedBudget selectedBudget={slectedState}/>
      <BudgetsList budgets={props.budgets} />
     </div>);
};

const mapStateToProps = (state) => {
  return { 
    budgets: state.budgets.budgets,
    error: state.budgets.error
  };
};

export default connect(mapStateToProps)(UserDashboard);
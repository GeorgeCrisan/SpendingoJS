import React, {useEffect} from 'react';
import {fetchBudgets} from '../../actions';
import {connect} from 'react-redux';

const UserDashBoard = (props) => {
  
  useEffect(()=>{
    const { dispatch } = props;
    console.log(props, 'here');
    let budgets = dispatch(fetchBudgets());
    console.log(budgets);
  },[]);

  return (<div> Temp div </div>);
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(UserDashBoard);
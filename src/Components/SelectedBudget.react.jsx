import React from 'react';

import './selectedbudget.scss';

export default function SelectedBudget(props) {

  console.log('what are',props);
  


  return (
    <div className='current__budget__wrapper'>
      <h2> {!props.selectedBudget.userSelected ? 'Latest Budget Created:' : 'Selected Budget:'} </h2>
      <p> { props.selectedBudget.selectedBudget.title } </p>
      <div>
         Current Budget data 
      </div>
    </div>
  );
};
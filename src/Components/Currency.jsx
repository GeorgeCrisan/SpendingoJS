import React from 'react';


export default function Currency(props) {

  const currency = {
    eu: '€',
    us: '$',
    uk: '£'
  };

return (<span style={{marginLeft: 2}} >{currency[props.currency]}</span>);

}
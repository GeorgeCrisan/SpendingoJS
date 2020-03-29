import React from 'react';


export default function Currency(props) {

  const currency = {
    eu: '€',
    us: '$',
    uk: '£'
  };

return (<span>{currency[props.currency]}</span>);

}
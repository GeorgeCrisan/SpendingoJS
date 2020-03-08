import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; 

import App from "../App";
import reduxStore from "../reduxStore";

const store = reduxStore();

function Spendingo() {
  return (
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  );
}

export default Spendingo;
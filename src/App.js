import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonSpendingo from './Components/ButtonSpendingo';

function App() {
  return (
    <div className="App">
      Hi Heorge
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <ButtonSpendingo>Wtf ??</ButtonSpendingo>
    </div>
  );
}

export default App;

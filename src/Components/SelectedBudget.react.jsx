import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Container, Button } from '@material-ui/core';
import Currency from './Currency';
import moment from 'moment';

import './selectedbudget.scss';


export default function SelectedBudget(props) {

  const [checked, setChecked] = React.useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setChecked(true);
    }, 400);
  }, []);

  let sb = props.selectedBudget.selectedBudget;

  return (
    <>
      { sb && <div className='current__budget__wrapper'>
        <Grow in={checked}>
            <Paper elevation={4} >
              <Container className={`current__budget__content`} maxWidth="md">
                <h2> {!props.selectedBudget.userSelected ? 'Latest Budget:' : 'Selected Budget:'} </h2>
                <p>  Budget title: <span> {sb.title}</span>  </p>
                <p> Description: <span>{sb.description}</span>  </p>
                <p> Total funds: <span>{sb.total}</span><Currency currency={sb.currency}/> </p>
                <p> Total spent: <span>{sb.progress}<Currency currency={sb.currency}/></span> </p>
                <p> Available to spend: <span>{`${sb.total - sb.progress}`}<Currency currency={sb.currency}/></span> </p>
                <p>  Created: <span>{moment.unix(sb.createddate.seconds).format("DD MMM YYYY")}</span></p>
                <div className='current__budget__button__wrapper'>
                  <Button size='large' variant="outlined"  className={'current__budget__button'} >
                    Manage
                  </Button>
                </div>
              </Container>
            </Paper>
          </Grow>
      </div> }
    </>
  );
};
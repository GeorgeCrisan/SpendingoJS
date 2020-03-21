import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Container } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import SentimentSatisfiedTwoToneIcon from '@material-ui/icons/SentimentSatisfiedTwoTone';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import './fpcontent.scss';

const useStyles = makeStyles(theme => ({
  root: {
    height: 32,
  },
  container: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  nestedcontainer: {
  },
  paper: {
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));


export default function FPContent() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setChecked(true);
    }, 400);
  }, []);

  return (<>

  <div className={'ipage__sassytext'}>
      <div className='paper__text__item'>
        <Zoom in={checked} style={{ transitionDelay: checked ? '100ms' : '0ms' }}>
            <p><PlaylistAddCheckIcon/>Manage your Spendings.</p>
        </Zoom>
      </div>
      <div className='paper__text__item'>
      <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
            <p><SentimentSatisfiedTwoToneIcon/>Useful and Reliable.</p>
        </Zoom>
        </div>
        <div className='paper__text__item'>
        <Zoom in={checked} style={{ transitionDelay: checked ? '1000ms' : '0ms' }}>
            <p><PeopleAltTwoToneIcon />Always Free.</p>
        </Zoom>
        </div>
      </div>

    <div className={`${classes.root} `}>
      <div className={`${classes.container} ipage__content `}>
        <Grow in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <Container className={`${classes.nestedcontainer} ipage__container`} maxWidth="md">
              <h2> What can Spendingo do? </h2>
              <p><DoneAllIcon /> Spendingo is an application useful for managing budgets.</p>
              <p><DoneAllIcon /> Allows you to plan and have control over your spendings.</p>
              <p><DoneAllIcon /> Create a budget and manage entries. Spendingo calculates everything for you.</p>
              <p><DoneAllIcon /> You can see a history of your spendings itemized and more. </p>
            </Container>
          </Paper>
        </Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Paper elevation={4} className={classes.paper}>
            <Container className={`${classes.nestedcontainer} ipage__container`} maxWidth="md">
              <h2> Motivation. </h2>
              <p><DoneAllIcon /> If you have the habit to allocate certain amount of money towards different plans, this is perfect for you.</p>
              <p><DoneAllIcon /> Plan your holiday budget, plan your wedding budget and spendings, plan an event. </p>
              <p><DoneAllIcon /> Spendingo aims to help you organsie yourself easily. Now on mobile, tablet or desktop.</p>
              <p><DoneAllIcon /> Now on mobile, tablet or desktop. Soon in app store.</p>
            </Container>
          </Paper>
        </Grow>
      </div>
    </div>
  </>);
}

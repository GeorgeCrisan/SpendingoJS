import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: '#f8f8f8',
    border: 2,
    borderColor: 'red',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function ButtonSpendingojs(props) {
  const classes = useStyles();
return <Button onClick={props.onClick} className={classes.root}>{props.children}</Button>;
}
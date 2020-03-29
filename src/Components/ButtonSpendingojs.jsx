import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #f25e7f 30%, #f0864f 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    width: 120,
    borderRadius: 3,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    transition: '0.2s',
    transform: 'translateY(0%)',
    '&:hover': {
      transform: 'translateY(10%)',
      //background: (props) =>
      //props.color === 'red'
      // ? 'linear-gradient(45deg,  #f0864f 30%,  #f25e7f 90%)'
      // : 'linear-gradient(45deg, #21CBF3 30%,  #2196F3 90%)',
    }
  },
});

export default function ButtonSpendingojs(props) {
  const classes = useStyles(props);
return <Button onClick={props.onClick} className={classes.root}>{props.children}</Button>;
}
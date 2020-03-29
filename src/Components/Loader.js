import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    width:  '45%',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    loader: {
      fontSize: 60
    }
  },
}));

export default function Loader() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <CircularProgress variant="determinate" className={classes.loader} value={progress} color="secondary" />
      <p style={{color: '#fff'}}> Loading ...</p>
    </div>
  );
}
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import UserDetails from '../components/UserDetails';
import { GET_USER } from '../queries';
import { IUser } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      borderTop: '1px solid #eee',
      paddingTop: theme.spacing(2),
      textAlign: 'center'
    },
    button: {
      '& + &': {
        marginLeft: theme.spacing(3)
      }
    },
    paper: {
      margin: `${theme.spacing(4)}px auto`,
      maxWidth: '700px',
      padding: theme.spacing(2)
    },
    progress: {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    },
    textCenter: {
      textAlign: 'center'
    }
  })
);

const User: React.FC = () => {
  const history = useHistory();
  const { id } = useParams() as { id: string };
  const { loading, error, data } = useQuery<{ user: IUser }>(GET_USER, {
    variables: { id }
  });

  const classes = useStyles();

  if (loading) {
    return (
      <Box className={classes.progress}>
        <CircularProgress size={72} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h5" className={classes.textCenter}>
        Something went wrong! Please try again later.
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Box mb={2}>
          <Typography variant="h5" align="center">
            User Details
          </Typography>
        </Box>
        <UserDetails user={data!.user} />
        <Box mt={2} className={classes.actions}>
          <Button
            color="primary"
            onClick={() => history.goBack()}
            startIcon={<ArrowBackIos />}
          >
            Go back
          </Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default User;

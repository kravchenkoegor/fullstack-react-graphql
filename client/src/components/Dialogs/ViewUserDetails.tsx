import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import UserDetails from '../UserDetails';
import { IUser } from '../../types';

interface IProps {
  onClose: () => void;
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      [theme.breakpoints.up('md')]: {
        minWidth: 500,
      },
    },
  })
);

const ViewUserDetails: React.FC<IProps> = ({ onClose, user }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <UserDetails user={user} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default ViewUserDetails;

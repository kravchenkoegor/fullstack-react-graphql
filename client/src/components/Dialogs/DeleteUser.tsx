import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      justifyContent: 'center',
    },
    button: {
      '& + &': {
        marginLeft: theme.spacing(3),
      },
    },
  })
);

interface IProps {
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteUser: React.FC<IProps> = ({ onClose, onSubmit }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
      <DialogActions className={classes.actions}>
        <Button className={classes.button} onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button className={classes.button} onClick={onSubmit} variant="contained" color="secondary">
          Yes, delete user
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default DeleteUser;

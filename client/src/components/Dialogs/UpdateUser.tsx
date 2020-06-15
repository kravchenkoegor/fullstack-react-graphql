import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IUpdateUserInputs, IUser, EMAIL_REGEX } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      justifyContent: 'center'
    },
    button: {
      '& + &': {
        marginLeft: theme.spacing(3)
      }
    }
  })
);

interface IProps {
  onClose: () => void;
  onSubmit: (input: IUpdateUserInputs) => Promise<void>;
  user: IUser;
}

const UpdateUser: React.FC<IProps> = ({ onClose, onSubmit, user }) => {
  const { register, handleSubmit, errors } = useForm<IUpdateUserInputs>();
  const classes = useStyles();

  const update = async (input: IUpdateUserInputs) => {
    await onSubmit(input);
  };

  return (
    <React.Fragment>
      <DialogTitle>Update user details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue={user.name}
          inputRef={register({
            required: 'Please complete this field to continue',
            minLength: {
              value: 2,
              message: 'Name should be min 2 characters long'
            },
            maxLength: {
              value: 20,
              message: 'Name should be max 20 characters long'
            }
          })}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
        />
        <TextField
          margin="normal"
          name="email"
          label="E-mail"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue={user.email}
          inputRef={register({
            required: 'Please complete this field to continue',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please provide correct email'
            }
          })}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button className={classes.button} onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          className={classes.button}
          onClick={handleSubmit(update)}
          variant="contained"
          color="secondary"
        >
          Update user
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default UpdateUser;

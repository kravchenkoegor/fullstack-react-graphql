import React, { useState, useContext } from 'react';
import { ApolloError } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../context/AppContext';
import { CREATE_USER, GET_USERS, COUNT } from '../queries';
import { IUser, ICreateUserInputs, EMAIL_REGEX } from '../types';

export const formatMutationError = (error: ApolloError | undefined): string => {
  return error ? error.message.replace('GraphQL error', 'Error') : '';
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: `${theme.spacing(4)}px auto`,
      maxWidth: '700px',
      padding: theme.spacing(2)
    },
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
    errorMessage: {
      color: theme.palette.error.main
    }
  })
);

const CreateUser: React.FC = () => {
  const { tablePage, tableRowsPerPage } = useContext(AppContext);

  const [createUser, { client, error }] = useMutation<{ createUser: IUser }>(
    CREATE_USER,
    {
      refetchQueries: [
        {
          query: GET_USERS,
          variables: {
            skip: tablePage * tableRowsPerPage,
            limit: tableRowsPerPage
          }
        }
      ],
      onCompleted() {
        try {
          const { cache } = client!;
          const { count } = cache.readQuery<{ count: number }>({
            query: COUNT
          })!;
          cache.writeQuery({
            query: COUNT,
            data: {
              count: count + 1
            }
          });
          history.push('/');
        } catch (e) {}
      }
    }
  );

  const history = useHistory();
  const redirectToHome = (): void => {
    history.push('/');
  };
  const { register, handleSubmit, errors } = useForm<ICreateUserInputs>();
  const [locked, setLocked] = useState(false);

  const onSubmit = async (input: ICreateUserInputs) => {
    if (!Object.keys(errors).length) {
      try {
        setLocked(true);
        await createUser({ variables: { input } });
        redirectToHome();
      } catch (e) {
        setLocked(false);
      }
    }
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Box mb={2}>
          <Typography variant="h5" align="center">
            Create User
          </Typography>
        </Box>
        {error && (
          <Typography className={classes.errorMessage}>
            {formatMutationError(error)}
          </Typography>
        )}
        <TextField
          autoFocus
          margin="normal"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
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
        <Box className={classes.actions} mt={2}>
          <Button
            className={classes.button}
            color="primary"
            onClick={redirectToHome}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="secondary"
            disabled={locked}
          >
            Create
          </Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default CreateUser;

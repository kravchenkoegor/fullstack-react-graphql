import React, { useState, useContext, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataTable from '../components/Table';
import Dialog from '../components/Dialog';
import Typography from '@material-ui/core/Typography';
import { AppContext } from '../context/AppContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GET_USERS, COUNT } from '../queries';
import { IUser, DialogType } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      transition: 'color .2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.dark
      }
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
    },
    textError: {
      color: theme.palette.error.main,
      marginTop: theme.spacing(2),
      whiteSpace: 'pre-line'
    }
  })
);

const Home: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('');
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<IUser>({} as IUser);
  const {
    tablePage,
    setTablePage,
    tableRowsPerPage,
    setTableRowsPerPage
  } = useContext(AppContext);

  const { loading, error, data: usersData } = useQuery<{ users: IUser[] }>(
    GET_USERS,
    {
      variables: {
        skip: tablePage * tableRowsPerPage,
        limit: tableRowsPerPage
      },
      fetchPolicy: 'cache-and-network'
    }
  );
  const { users } = usersData || {};

  if (users && !users.length && tablePage > 0) {
    setTablePage(tablePage - 1);
  }

  const { data: countData } = useQuery<{ count: number }>(COUNT);
  const { count } = countData || {};

  const openDialog = (userId: string, type: DialogType) => {
    setUserId(userId);

    if (type !== 'delete') {
      const user = users && users.find((user: IUser) => user.id === userId);
      user && setUserData(user);
    }

    setShowDialog(true);
    setDialogType(type);
  };

  const handleChangeRowsPerPage = (rowsPerPage: number): void => {
    setTableRowsPerPage(rowsPerPage);
    setTablePage(0);
  };

  const classes = useStyles();

  let template: ReactElement | null = null;

  if (loading) {
    template = (
      <Box className={classes.progress}>
        <CircularProgress size={72} />
      </Box>
    );
  }

  if (error) {
    let errorMessage = '';
    const { graphQLErrors, networkError } = error;
    if (graphQLErrors.length) {
      errorMessage = graphQLErrors.map(e => e.message).join('\n');
    } else if (networkError) {
      errorMessage = error.message;
    }

    template = (
      <div className={classes.textCenter}>
        <Typography variant="h5">
          Something went wrong! Please try again later.
        </Typography>
        <Typography variant="h5" className={classes.textError}>
          {errorMessage}
        </Typography>
      </div>
    );
  }

  if (users && users.length && count) {
    template = (
      <DataTable
        count={count}
        deleteUser={(userId: string) => openDialog(userId, 'delete')}
        handleChangePage={(_: any, newPage: number) => setTablePage(newPage)}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={tablePage}
        rowsPerPage={tableRowsPerPage}
        updateUser={(userId: string) => openDialog(userId, 'update')}
        users={users}
        viewUserDetails={(userId: string) => openDialog(userId, 'view')}
      />
    );
  }

  if (users && !users.length) {
    template = (
      <Typography variant="h5" className={classes.textCenter}>
        There are no users yet.
        <br />
        <Link to="/create-user" className={classes.link}>
          Go here
        </Link>{' '}
        and add at least one.
      </Typography>
    );
  }

  return (
    <React.Fragment>
      {template}
      <Dialog
        onClose={() => setShowDialog(false)}
        showDialog={showDialog}
        type={dialogType}
        userId={userId}
        userData={userData}
      />
    </React.Fragment>
  );
};

export default Home;

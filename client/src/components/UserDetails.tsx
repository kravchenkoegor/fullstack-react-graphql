import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IUser } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      borderRadius: '50%',
    },
    content: {
      display: 'flex',
    },
    dialogContent: {
      [theme.breakpoints.up('md')]: {
        minWidth: 500,
      },
    },
    fontWeightBold: {
      fontWeight: 700,
    },
  })
);

const UserDetails: React.FC<{ user: IUser }> = ({ user }) => {
  const classes = useStyles();

  return (
    <Container disableGutters style={{ display: 'flex' }}>
      <img src={user.avatar} alt="" width={64} height={64} className={classes.avatar} />
      <Box ml={3}>
        <Typography className={classes.fontWeightBold}>Name</Typography>
        <Typography>{user.name}</Typography>

        <Box mt={2}>
          <Typography className={classes.fontWeightBold}>Email</Typography>
          <Typography>{user.email}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDetails;

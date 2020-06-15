import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      width: '100%',
      marginBottom: theme.spacing(4)
    },
    title: {
      color: '#ffffff',
      marginRight: 'auto',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      },
      textDecoration: 'none',
      transition: 'color .2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main
      }
    }
  })
);

const AppHeader: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.title} to="/">
            <Typography variant="h6" noWrap>
              React.js + GraphQL App
            </Typography>
          </Link>

          {pathname !== '/create-user' && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push('/create-user')}
            >
              Create user
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppHeader;

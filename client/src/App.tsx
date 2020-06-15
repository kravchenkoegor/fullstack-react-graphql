import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import { AppState } from './context/AppState';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './views/Home';
import CreateUser from './views/CreateUser';
import User from './views/User';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#465362'
    },
    secondary: {
      main: '#04A777'
    },
    error: {
      main: '#ED254E'
    }
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    container: {
      marginBottom: theme.spacing(4)
    }
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <AppHeader />
            <AppState>
              <Container className={classes.container}>
                <Switch>
                  <Route path="/create-user">
                    <CreateUser />
                  </Route>
                  <Route path="/user/:id">
                    <User />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Container>
            </AppState>
            <AppFooter />
          </CssBaseline>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;

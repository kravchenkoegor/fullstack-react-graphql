import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';

const isDev = process.env.NODE_ENV === 'development';
const client = new ApolloClient({
  uri: `${isDev ? 'http://localhost:5000' : ''}/graphql`
});

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

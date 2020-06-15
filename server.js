require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// Start Express server
const app = express();
app.use('/static', express.static(path.join(__dirname, '/client/build/static')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Import Mongoose models
const User = require('./models/User');

// Connect to MongoDB
const mongoConfig = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose
  .connect(process.env.DATABASE_URL, mongoConfig)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error));

// Import typeDefs and resolvers
const typeDefs = fs.readFileSync(path.join(__dirname, 'typeDefs.gql'), 'utf-8');
const resolvers = require('./resolvers');

// Start Apollo/GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => ({
    name: error.name,
    message: error.message.replace('Context creation failed: ', '')
  }),
  context: { User }
});

// Add the Apollo Server’s middleware
server.applyMiddleware({ app });

// Listen
app.listen({ port: process.env.PORT || 5000 }, () =>
  console.log(`Apollo Server is listening on ${server.graphqlPath}`)
);

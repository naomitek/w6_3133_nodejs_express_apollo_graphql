const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(`Cannot connect to DB - ${error.message}`);
  }
};


const app = express();
app.use(express.json());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    connectDB();
  });
}

startServer();

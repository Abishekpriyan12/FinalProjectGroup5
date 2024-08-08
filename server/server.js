const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Configuration values
const port = 5000;
const mongoUri =
  "mongodb+srv://abishekpriyan11:Abishek123@cluster0.1yfwona.mongodb.net/"; // Replace with your MongoDB connection string

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// GraphQL type definitions and resolvers
const typeDefs = require("./schemas/employeeSchema");
const resolvers = require("./resolvers/employeeResolvers");

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Start the server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `Server is running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

// Connect to the database and start the server
connectDB();
startServer();

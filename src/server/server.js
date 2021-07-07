const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// have environment variables in .env file
require('dotenv').config()

// Establish Port and Server
const app = express();
const PORT = 3000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable CORS 
app.use(cors());

// Routes
const exercisesRouter = require('./router/exerciseRouter');
const usersRouter = require('./router/userRouter');

// serve up html file
app.use(express.static(path.join(__dirname, '../../dist/')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
});

// database URI
const uri = process.env.ATLAS_URI;
// connect to mongo database by passing in uri, flags: {useNewUrlParser: parses mongo strings, useCreateIndex: deal with mongo deprecating index function}
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})

// Re-direct to route handlers:
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});

// Start Server
app.listen(PORT, () => { console.log(`Listening on port: ${PORT}...`); });

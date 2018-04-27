"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  const DataHelpers = require('./lib/data-helpers.js')(db);

  const tweetsRoutes = require('./routes/tweets')(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use('/tweets', tweetsRoutes);


    // close connection
    //db.close();
});


app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
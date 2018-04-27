"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    // saveTweet: function(newTweet, callback) {
    //   simulateDelay(() => {
    //     db.tweets.push(newTweet);
    //     callback(null, true);
    //   });
    // },
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }
  };
}

  // the above getTweet was originally as bellow (from index.js)
  //
  // function getTweets(callback) {
  //     db.collection('tweets').find().toArray(callback);
  // }
  // getTweets((err, tweets) => {
  //   if (err) throw err;
  //   let output = {};
  //   for (let tweet of tweets) {
  //     console.log(tweet);
  //   }
  // });
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$( document ).ready(function(){
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  var $tweet = createTweetElement(tweetData);

  function createTweetElement(data) {
    var today = new Date();
    var date_ms = Date.parse(today);
    var diff = new Date(date_ms - tweetData.created_at);
    var days = Math.floor(diff / (24*60*60*1000));

    //console.log('back', days);
    var res = `<article class="post-tweet">\n
          <header>\n
            <img class="logo" src="${tweetData.user.avatars.small}">\n
            <h3>${tweetData.user.name}</h3>\n
            <span>${tweetData.user.handle}</span>\n
          </header>\n
          <p>${tweetData.content.text}</p>\n
          <footer>\n
            <p>${days} days ago\n
              <span>\n
                <i class="fa fa-flag"></i>\n
                <i class="fa fa-retweet"></i>\n
                <i class="fa fa-heart"></i>\n
              </span>\n
            </p>\n
          </footer>\n
        </article>\n `;
      return res;
  }
  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like to add it to the page so we can make sure it's got all the right elements, classes, etc.
  $('#tweets-container').append($tweet);


});
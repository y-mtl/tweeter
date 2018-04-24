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
    var res = `<article class="post-tweet">\n
          <header>\n
            <img class="logo" src="${tweetData.user.avatars.small}">\n
            <h3>${tweetData.user.name}</h3>\n
            <span>${tweetData.user.handle}</span>\n
          </header>\n
          <p>${tweetData.content.text}</p>\n
          <footer>\n
            <p>${tweetData.created_at}\n
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
  console.log($tweet); // to see what it looks like
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  $('#tweets-container').append($tweet);

// var dat1 = new Date(2010, 4, 15);  //2010/05/15
// var dat2 = new Date(2010, 5, 20);  //2010/06/20
// var diff = (dat2.getTime() - dat1.getTime()) / (1000 * 60 * 60 *24);
// document.writeln(diff + '日の差があります');
// //36日の差があります
// 経過ミリ秒÷(1000ミリ秒×60秒×60分×24時間)







});
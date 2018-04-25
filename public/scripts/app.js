// Fake data taken from tweets.json
const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$( document ).ready(function(){

  function renderTweets(tweets) {
    var output = [];
    let $container = $("#tweets-container");

    for (var i in tweets) {
      //get days
      const today = new Date();
      const date_ms = Date.parse(today);
      const diff = date_ms - tweets[i].created_at;
      const days_diff = Math.floor(diff / (24*60*60*1000));
      // adds days_diff to tweet obj
      tweets[i]['days'] = days_diff;

      output = createTweetElement(tweets[i]);
      $container.append(output);
    }

    return $container;
  }

  function createTweetElement(tweet) {
      let $tweet = $('<article>');
      let $header = $("<header>").appendTo($tweet);
      let $img = $("<img>").attr("src", tweet.user.avatars.small).addClass("logo").appendTo($header);
      let $h3 = $("<h3>").text(tweet.user.name).appendTo($header);
      let $span = $("<span>").text(tweet.user.handle).appendTo($header);

      let $p = $("<p>").text(tweet.content.text).appendTo($tweet);

      let $footer = $("<footer>").appendTo($tweet);
      let $footer_p = $("<p>").text(`${tweet.days} days ago`).appendTo($footer);
      let $footer_span = $("<span>").html('<i class="fa fa-flag"></i>\n<i class="fa fa-retweet"></i>\n<i class="fa fa-heart"></i>').appendTo($footer_p);

      return $tweet;console.log(tweet);
  }
  renderTweets(data);

});
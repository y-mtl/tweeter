$( document ).ready(function(){

  function renderTweets(tweets) {
     $('#tweets-container').empty();
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
      $container.prepend(output);
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
      let $footer_p = $("<p>").text(tweet.days + 'days ago').appendTo($footer);
      let $footer_span = $("<span>").html('<i class="fa fa-flag"></i>\n<i class="fa fa-retweet"></i>\n<i class="fa fa-heart"></i>').appendTo($footer_p);

      return $tweet;
  }
  //renderTweets(data);

  function loadTweets(){
    $.ajax({
      url: '/tweets',
      method: 'GET',
      cache: false,
      dataType: 'json',
      success: function(tweetsData){
        renderTweets(tweetsData);
      }
    });
  }
  loadTweets();

  // form submission
  $postUrl = '/tweets';
  $('.new-tweet input[type="submit"]').on('click', function(e){
    e.preventDefault();
    //console.log('Sending it now.');
    var tweetData = $(this).siblings('textarea[name=text]').val();

    if (tweetData.length === 0){
      $errorMsg = 'You can\'t leave it blank.';
    } else if (tweetData.length > 140) {
      $errorMsg = 'Character limit: 140!';
    } else {
      $errorMsg = '';
    }
    $('.new-tweet p.error').text($errorMsg);

    tweetData = 'text=' + tweetData;
    $.ajax({
      url: $postUrl,
      method: 'POST',
      data: $(this).siblings('textarea').serialize(),
      success: function(data, status, jqXHR){
        if (status !== 'success') {
          let errorMsg = 'There was an error. Please try again.';
          throw "Request was not a success";
        }

        loadTweets();
      }
    })
  });

});
$( document ).ready(function(){
  function getDiff(timeData) {
    const unix = timeData;
    const date = new Date();
    const current = date.getTime();
    const diff_sec = Math.floor((current - unix) / 1000);// to ms to sec

    if(diff_sec < 60){
        var time   = Math.floor(diff_sec);
        var unit = time > 1 ? ' seconds' : ' second';
    } else if(diff_sec < 3600){
        time = Math.floor(diff_sec/60);
        unit = time > 1 ? ' minutes' : ' minute';
    } else if(diff_sec < 86400){
        time = Math.floor(diff_sec/3600);
        unit = time > 1 ? ' hours' : ' hour';
    } else if(diff_sec < 2592000){
        time = Math.floor(diff_sec/86400);
        unit = time > 1 ? ' days' : ' day';
    } else if(diff_sec < 31536000){
        time = Math.floor(diff_sec/259200);
        unit = time > 1 ? ' months' : ' month';
    } else {
        time = Math.floor(diff_sec/31536000);
        unit = time > 1 ? ' years' : ' year';
    }
    const res = time + ' '  + unit + ' ago';
    return res;
  }

  function renderTweets(tweets) {
     $('#tweets-container').empty();
    var output = [];
    let $container = $('#tweets-container');

    for (let i in tweets) {
      output = createTweetElement(tweets[i]);
      $container.prepend(output);
    }
    return $container;
  }

  function createTweetElement(tweet) {
      const daysDiff = getDiff(tweet.created_at);
      const $tweet = $('<article>');
      const $header = $('<header>').appendTo($tweet);
      const $img = $('<img>').attr('src', tweet.user.avatars.small).addClass('logo').appendTo($header);
      const $h3 = $('<h3>').text(tweet.user.name).appendTo($header);
      const $span = $('<span>').text(tweet.user.handle).appendTo($header);

      const $p = $('<p>').text(tweet.content.text).appendTo($tweet);

      const $footer = $('<footer>').appendTo($tweet);
      const $footer_p = $('<p>').text(daysDiff).appendTo($footer);
      const $footer_span = $('<span>').html('<i class="fa fa-flag"></i>\n<i class="fa fa-retweet"></i>\n<i class="fa fa-heart"></i>').appendTo($footer_p);

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
    let validation = false;
    let $errorMsg = '';
    if (tweetData.length === 0){
      $errorMsg = 'Are you sure? nothing to say??';
    } else if (tweetData.length > 140) {
      $errorMsg = 'Character limit: 140!';
    } else {
      $errorMsg = '';
      validation = true;
    }
    $('.new-tweet .error').text($errorMsg);

    $(function() {
        setTimeout(function() {
          $('.new-tweet .error').fadeOut(1500);
        }, 3000)
        $('.new-tweet .error').show();
        setTimeout(function() {
          $('.new-tweet .error').fadeOut(1500);
        }, 3000)
    });

    tweetData = 'text=' + tweetData;

    // if char num is in the range, pass it to ajax
    if(validation) {
      $.ajax({
        url: $postUrl,
        method: 'POST',
        data: $(this).siblings('textarea').serialize(),
        success: function(data, status, jqXHR){
          if (status !== 'success') {
            $errorMsg = 'There was an error. Please try again.';
            throw 'Request was not a success';
          } else {
            $('textarea[name="text"]').val('');
            $('form .counter').text(140);
          }

          loadTweets();
        }
      })
    }
  });

});
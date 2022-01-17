function() {
    $('#rendered-tweets').empty(); // clear old tweets
    var tweet_input = $(this).children('input#contweet').val();
    var matches = tweet_input.match(/(\d+)/g);
    if (matches) {
      // use the last number in the URL/input, which should be the id
      var initial_tweet_id = matches[matches.length-1];

      $.ajax({
        url:'http://api.twitter.com/1/statuses/show/'+initial_tweet_id+'.json?trim_user=1',
        error: displayError,
        success: loadConfabulatedTweets
      });
      
      window.location.hash = '#'+initial_tweet_id;
    } else {
      // input didn't contain a number
      $('#rendered-tweets').prepend(
        '<p class="error">Please enter a tweet id (long number) or a tweet URL.</p>'
      );
    }
    return false;
  }
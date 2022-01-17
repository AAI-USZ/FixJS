function() {
    $('#rendered-tweets').empty(); // clear old tweets
    var tweet_input = $(this).children('input#contweet').val();
    var matches = tweet_input.match(/(\d+)/g);
    if (matches) {
      // use the last number in the URL/input, which should be the id
      var initial_tweet_id = matches[matches.length-1];
      // disable the button while we fetch stuff
      $(this).children(':submit')
        .val('Confabulating...')
        .attr('disabled', true);

      $.ajax({
        url:'http://api.twitter.com/1/statuses/show/'+initial_tweet_id+'.json?trim_user=1',
        error: displayError,
        success: loadConfabulatedTweets
      }).complete(function(){
        // enable the button - we either succeeded or failed, but the user
        // will need the button again either way
        $('#confabulation').children(':submit')
          .val('Confabulate')
          .removeAttr('disabled');
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
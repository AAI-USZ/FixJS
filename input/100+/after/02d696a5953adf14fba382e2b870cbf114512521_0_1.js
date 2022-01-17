function(tweet, tweetReqStatus) {
  console.log(tweet.id_str, ': ', tweet.text);

  // get the oembed details for the tweet
  $.ajax({
    url:'http://api.twitter.com/1/statuses/oembed.json?id='+tweet.id_str,
    dataType: 'jsonp',
    error: function(){},
    success: function(embed, embedReqStatus) {
      $('#confabulation').after(embed.html);
      // if this tweet is in reply to another - act on that as well
      if (tweet.in_reply_to_status_id_str) {
        $.ajax({
          url:'http://api.twitter.com/1/statuses/show/'+tweet.in_reply_to_status_id_str+'.json?trim_user=1',
          dataType: 'jsonp',
          error: function(){},
          success: loadConfabulatedTweets
        });
      }
    }
  });
}
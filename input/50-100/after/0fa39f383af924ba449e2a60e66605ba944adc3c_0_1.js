function(tweet, tweetReqStatus) {
  // get the oembed details for the tweet
  $.ajax({
    url:'http://api.twitter.com/1/statuses/oembed.json?'+
      'id='+tweet.id_str+
      'omit_script=1'+
      '&hide_thread=1',
    success: function(embed, embedReqStatus) {
      $('#rendered-tweets').prepend(embed.html);
      // if this tweet is in reply to another - act on that as well
      if (tweet.in_reply_to_status_id_str) {
        $.ajax({
          url:'http://api.twitter.com/1/statuses/show/'+
            tweet.in_reply_to_status_id_str+'.json?'+
            'trim_user=1',
          success: loadConfabulatedTweets
        });
      }
    }
  });
}
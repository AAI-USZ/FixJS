function(tweet, tweetReqStatus) {
  console.log('getTweet ', tweet.id_str, ': ', tweet);

  // get the oembed details for the tweet
  $.ajax({
    url:'http://api.twitter.com/1/statuses/oembed.json?'+
      'id='+tweet.id_str+
      'omit_script=1'+
      '&hide_thread=1',
    error: displayError,
    success: function(embed, embedReqStatus) {
      console.log('embed author: ', embed.author_name, ' - ', embed);
      embed.created_at = tweet.created_at;
      console.log('oembed_list.push(', embed.created_at, '): ', oembed_list.push(embed));
      console.log('oembed_list contents currently (',oembed_list.length, '): ', oembed_list);
      $('#concount').html(oembed_list.length);
      //$('#rendered-tweets').prepend(embed.html);
      // if this tweet is in reply to another - act on that as well
      if (tweet.in_reply_to_status_id_str) {
        $.ajax({
          url:'http://api.twitter.com/1/statuses/show/'+
          tweet.in_reply_to_status_id_str+'.json?'+
            'trim_user=1',
          error: displayError,
          success: getTweet
        });
      } else {
        // no more replies to follow, stop recursing
        console.log('finished recursive calls, oembed_list = ',oembed_list);
        processEmbedData(oembed_list);
      }
    }
  });
}
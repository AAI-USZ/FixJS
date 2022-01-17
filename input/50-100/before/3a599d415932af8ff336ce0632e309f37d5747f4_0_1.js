function(data){
    if (feed.readyState === 4) {
      var tweets = new Array();
      for (i in data){
        if(tweets.length < count){
          if(replies || data[i].in_reply_to_user_id == null){
            tweets.push(data[i]);
          }
        }
      }
      showTwitterFeed(tweets, user);
    }
  }
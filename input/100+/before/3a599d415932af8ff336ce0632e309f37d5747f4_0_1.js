function getTwitterFeed(user, count, replies) {
  feed = new jXHR();
  feed.onerror = function (msg,url) {
    $('#tweets li.loading').addClass('error').text("Twitter's busted");
  }
  feed.onreadystatechange = function(data){
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
  };
  feed.open("GET","http://twitter.com/statuses/user_timeline/"+user+".json?trim_user=true&count="+(parseInt(count)+60)+"&callback=?");
  feed.send();
}
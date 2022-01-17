function(tweet) {
      var str = /\bscreen_name-(\w+)/.exec(tweet.className);
      var uname = str && str[1];
      str = /\bid-(\d+)/.exec(tweet.className);
      var id = str && str[1];
      str = null;
      var repbtn = tweet.querySelector(".reply");
      if (id && uname &&
        t.id.value === id && t.status.value.match("@" + uname + "\\b")) {
        tweet.classList.add("reply_target");
        if (repbtn) repbtn.disabled = true;
        return true;
      } else {
        tweet.classList.remove("reply_target");
        if (repbtn) repbtn.disabled = false;
        return false;
      }
    }
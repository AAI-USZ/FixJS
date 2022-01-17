function switchReplyTarget() {
    if (!t.id.value) return;
    var replying = false;
    [].forEach.call(D.qs(".tweet"), function(tweet) {
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
        t.replink.textContent = "to @" + uname;
        replying = true;
      } else {
        tweet.classList.remove("reply_target");
        if (repbtn) repbtn.disabled = false;
      }
    });
    if (replying) {
      t.replink.hidden = false;
    } else {
      t.replink.hidden = true;
    }
    return replying;
  }
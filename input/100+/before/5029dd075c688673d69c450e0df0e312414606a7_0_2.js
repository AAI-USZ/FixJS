function() {
  function switchReplyTarget() {
    if (!t.id.value) return;
    var replying = [].some.call(D.qs(".tweet"), function(tweet) {
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
    });
    if (replying) {
      t.replink.hidden = false;
    } else {
      t.replink.hidden = true;
    }
    return replying;
  }

  var t = {
    box: D.ce("div"),
    status: D.ce("textarea").sa("id", "status"),
    id: D.ce("input").sa("id", "in_reply_to_status_id").sa("type", "hidden"),
    replink: D.ce("a").add(D.ct(">")),
    update: D.ce("button").sa("id", "update").add(D.ct("Tweet"))//,
    //media: D.ce("input").sa("id", "media_upload")
  };

  t.replink.hidden = true;

  t.id.addEventListener("input", switchReplyTarget, false);

  t.status.addEventListener("input", function() {
    var replying = switchReplyTarget();
    var red = /^d\s+\w+\s*/;
    var reurl = /(^|\s)https?:\/\/[-\w.!~*'()%@:$,;&=+/?#\[\]]+/g;
    if (replying) {
      t.update.textContent = "Reply";
    } else if (red.test(t.status.value)) {
      t.update.textContent = "D";
    } else {
      t.update.textContent = "Tweet";
    }
    t.update.disabled = t.status.value.replace(red, "").
                    replace(reurl, "$1http://t.co/1234567").length > 140;
  }, false);

  t.update.addEventListener("click", function() {
    API.tweet(t.status.value, t.id.value, "", "", "", "", "",
    function(xhr) { alert(xhr.responseText); });
  }, false);

  /*t.media.type = "file";
  t.media.addEventListener("change", function(e) {
    var file = t.media.files[0];
    var fr = new FileReader;
    fr.onload = function() {
      var img = document.createElement("img");
      img.src = fr.result;
      img.alt = file.name;
      D.q("body").appendChild(img);
    };
    fr.readAsDataURL(file);
  }, false);*/

  t.replink.addEventListener("click", function() {
    var e = D.q(".tweet[class~=\"id-" + t.id.value + "\"]");
    if (e) e.scrollIntoView();
  }, false);

  t.box.add(t.status, t.id, /*t.media,*/ t.update, t.replink);

  D.id("header").add(t.box);
}
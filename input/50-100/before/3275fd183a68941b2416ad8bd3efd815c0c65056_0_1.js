function show_tweets(tweets, element) {
    for (t in tweets) {
        var tweet = tweets[t];
        var t = '<li class="post">' + fmt_text(tweet["text"]) + "<br />";
        t += '<a href="http://twitter.com/' + tweet["user"]["screen_name"] + '/status/' + tweet["id_str"] + '">'
        t += '<span class="tweet description">' + fmt_date(tweet["created_at"]) + "</span>";
        t += "</a></li>";
        element.innerHTML += t;
    }
}
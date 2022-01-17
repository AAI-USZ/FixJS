function (_tid) {
//		console.log("in setTwitter, _tid = " + _tid );
        var url = "http://www.twitter.com/" + _tid;

        this.artistTwitterID = _tid;
        this.artistTwitterURL = url;

        if (_tid) {
            this.retrieveTweets();
        } else {
            var tweetText = $("div._recent_tweets");
            tweetText.text("");
        }
        this.get("model").dprChange();
    }
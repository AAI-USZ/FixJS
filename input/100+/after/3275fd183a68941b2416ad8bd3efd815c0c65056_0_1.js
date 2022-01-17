function load_tweets() {
    var element = document.getElementById("tweets");
    if (element) {
        var callback = "like_a_boss";
        var username = "the_earwig";
        var count = 4;
        var url = "https://twitter.com/statuses/user_timeline/" + username + ".json?count=" + count + "&callback=" + callback;

        var script = document.createElement("script");
        var head = document.getElementsByTagName("head")[0];

        window[callback] = function(tweets) {
            head.removeChild(script);
            show_tweets(tweets, element);
        };

        script.src = url;
        head.appendChild(script);
    }
}
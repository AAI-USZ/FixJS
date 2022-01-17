function displayTweets(tweets){
	for (var i = 0; i < tweets.results.length; i++) {
		lTweets += tweets.results[i].text+"<br>";
	};
	lTweets += "</p>";
}
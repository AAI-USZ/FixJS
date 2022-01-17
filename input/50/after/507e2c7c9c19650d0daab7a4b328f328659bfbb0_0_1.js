function(tweet) {
			var view = new TweetView({model: tweet});
			this.tweetListEl.append(view.render().el);
			tweetViews.push(view);
			Tweets.sort();
		}
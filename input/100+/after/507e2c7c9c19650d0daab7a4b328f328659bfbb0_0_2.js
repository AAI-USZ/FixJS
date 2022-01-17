function() {
			
			this.friendListEl = this.$('#friend-list');
			this.searchInput = this.$('#searchInput');
			this.tweetListEl = this.$('#tweetList');
			this.newTweetInput = this.$('#newTweetTA');
			
			Friends.bind('add', this.addFriend, this);
			SearchResult.bind('add', this.addSearchResult,this);
			SearchResult.bind('reset', this.addAllSearchResults,this);
			
			Tweets.bind('reset', this.resetTweets,this);
			Tweets.bind('add', this.addTweet, this);
			
			Friends.add(friendList); 
			Tweets.add(tweetInitialList);
			
		}
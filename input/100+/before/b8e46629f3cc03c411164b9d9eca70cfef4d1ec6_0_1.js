function (data)
		{
			if (typeof data[0] !== 'object')
			{
				if (page < 4)
				{
					loadTweet(page + 1);
				}
				else
				{
					$('.last_tweet > .tweet_container').html('Error loading the tweet');
				}

				return;
			}

			var tweet = data[0];
			var timestamp = (new Date(tweet.created_at)).getTime();
			var time = formatDateAgo(Math.floor(timestamp / 1000));

			$('.last_tweet > .tweet_container')
				.html(beautifyTweet(tweet.text) + ' &mdash; ' + time);
		}
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
			var fuckIE = tweet.created_at.split(' ');
			var date = Date.parse(fuckIE[1] + ' ' + fuckIE[2] + ', ' +
				fuckIE[5] + ' ' + fuckIE[3] + ' UTC');
			var timestamp = (new Date(date)).getTime();
			var time = formatDateAgo(Math.floor(timestamp / 1000));

			$('.last_tweet > .tweet_container')
				.html(beautifyTweet(tweet.text) + ' &mdash; ' + time);
		}
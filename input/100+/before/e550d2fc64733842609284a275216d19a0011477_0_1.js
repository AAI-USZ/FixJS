function(json) {
			var tweets = json.spectql;

			// process tweets
			for (var i in tweets) {
				// time ago string
				var minutes = parseInt(tweets[i].created_at.replace("'", ""));
				if (minutes < 1) // less than 1 minute
					tweets[i].ago = i18n.just_now;
				else if (minutes == 1) // 1 minute
					tweets[i].ago = minutes + ' ' + i18n.minute;
				else if (minutes < 60) // less than 1 hour
					tweets[i].ago = minutes + ' ' + i18n.minutes;
				else if (minutes < 120) // less than 2 hours
					tweets[i].ago = Math.floor( minutes / 60 ) + ' ' + i18n.hour;
				else if (minutes < 1440) // less than 1 day
					tweets[i].ago = Math.floor( minutes / 60 ) + ' ' + i18n.hours;
				else if (minutes < 2880) // less than 2 days
					tweets[i].ago = Math.floor( minutes / 1440 ) + ' ' + i18n.day;
				else if (minutes < 10080) // less than 1 week
					tweets[i].ago = Math.floor( minutes / 1440 ) + ' ' + i18n.days;
				else if (minutes < 20160) // less than 2 weeks
					tweets[i].ago = Math.floor( minutes / 1440 ) + ' ' + i18n.week;
				else if (minutes < 44640) // less than 31 days
					tweets[i].ago = Math.floor( minutes / 1440 ) + ' ' + i18n.weeks;
				else
					tweets[i].ago = i18n.long_time;
				
				// #tags
				tweets[i].text = tweets[i].text.replace(/(#[^\s]+)/g, '<span class="text-color">$1</span>');
				// @replies
				tweets[i].text = tweets[i].text.replace(/(@[^\s]+)/g, '<span class="text-color">$1</span>');
				// links                                  [   https://www.   |www.| domain.| ... ]
				tweets[i].text = tweets[i].text.replace(/((https?:\/\/(\w\.)*|\w\.)[^\s]+\.[^\s]+)/g, '<span class="text-color">$1</span>');
			}
			
			return tweets;
		}
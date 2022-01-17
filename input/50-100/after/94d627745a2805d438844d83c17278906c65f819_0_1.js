function(index, item){
			if(index == 0)
				localStorage['last_id'] = item.id_str;
			var tweet = $('<div class="tweet"></div>');
			tweet.text(item.user.screen_name + ": " + item.text);
			homeTimeline.append(tweet);
		}
function(index, item){
			console.log("Length: " + data.length);
			console.log("Index: " + index);
			console.log("---");
			if(index + 1 == data.length) {
				localStorage['last_id'] = item.id_str;
				console.log(item.id_str);
			}
			var tweet = $('<div class="tweet"></div>');
			tweet.text(item.user.screen_name + ": " + item.text);
			homeTimeline.prepend(tweet);
		}
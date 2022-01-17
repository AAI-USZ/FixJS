function processHomeTimeline(data) {
		var homeTimeline = $('#home');
		console.log(data);
		$.each(data, function(index, item){
			if(index + 1 == data.length)
				localStorage['last_id'] = item.id_str;
			var tweet = $('<div class="tweet"></div>');
			tweet.text(item.text);
			homeTimeline.prepend(tweet);
		});
	}
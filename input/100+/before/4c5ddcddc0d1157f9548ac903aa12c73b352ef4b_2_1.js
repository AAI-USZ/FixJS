function(){
		var allAjaxCalls = [];

		for (var i=0, length=options.users.length; i<length; i++) {

			var url = "https://search.twitter.com/search.json?include_entities=true&"
				+"from=" + options.users[i]
				+"&rpp=" + options.num_feeds
				+"&with_twitter_user_id=true"
				+"&callback=?";
			var tempajax = $.getJSON( url );
			allAjaxCalls.push(tempajax);

			$.when(tempajax).then(function (data) { 
				console.log(data);
				renderTwitterObjs(data);
			});
		}

		return $.when.apply(null, allAjaxCalls); // return ajax promises when the calls are finished	
	}
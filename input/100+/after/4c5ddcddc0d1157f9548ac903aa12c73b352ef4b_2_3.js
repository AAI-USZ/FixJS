function($, window){
	var self = {};

	var options = {
		showDate : true,
		showUserName : true
	}

	self.twitterObjArr = [];
	self.twitterPromise;

	self.init = function(userOptions){
		console.log("twitter init");
		options = $.extend(options, userOptions || {});
		self.twitterPromise = getTwitterPromise();
	}

	var getTwitterPromise = function(){
		var allAjaxCalls = [];

		for (var i=0, length=options.users.length; i<length; i++) {

			var url = "https://search.twitter.com/search.json?include_entities=true&"
				+"from=" + options.users[i]
				+"&rpp=" + options.num_feeds
				+"&with_twitter_user_id=true"
				+"&callback=?";
			var tempajax = $.getJSON( url );
			allAjaxCalls.push(tempajax);
			console.log(url);

			$.when(tempajax).then(function (data) { 
				console.log(data);
				renderTwitterObjs(data);
			});
		}

		return $.when.apply(null, allAjaxCalls); // return ajax promises when the calls are finished	
	}

	var renderTwitterObjs = function(data){
		for(var i=0, length=data.results.length; i<length; i++){
			self.twitterObjArr.push(data.results[i]);

			var currObj = data.results[i];

			var created_at = currObj.created_at;
			var text = currObj.text;
			var from_user = currObj.from_user;
			var $itemHtml = $('<div class="tweetItem"></div>');

			$itemHtml.append('<div class="itemBody">'+ text +'</div>');

			if(options.showDate == true)
				$itemHtml.append('<div class="itemTime">'+ created_at +'</div>');
			if(options.showUserName == true)
				$itemHtml.append('<div class="itemFromUser">'+ from_user +'</div>');

			currObj.validDateForSorting = created_at;
			currObj.itemHtml = $itemHtml;

			self.twitterObjArr.push(currObj); //add modified twitter json objs to twitterObjArr. will be used later.
		}
	}

	return self;

}
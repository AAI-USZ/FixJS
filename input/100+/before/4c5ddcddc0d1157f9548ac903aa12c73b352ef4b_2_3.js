function($, window){

	var options = {
		showDate : true,
		showUserName : true
	}

	this.twitterObjArr = [];
	this.twitterPromise;

	init = function(userOptions){
		options = $.extend(options, userOptions || {});
		twitterPromise = getTwitterPromise();
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

			$.when(tempajax).then(function (data) { 
				console.log(data);
				renderTwitterObjs(data);
			});
		}

		return $.when.apply(null, allAjaxCalls); // return ajax promises when the calls are finished	
	}

	var renderTwitterObjs = function(data){
		for(var i=0, length=data.results.length; i<length; i++){
			twitterObjArr.push(data.results[i]);

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

			twitterObjArr.push(currObj); //add modified twitter json objs to twitterObjArr. will be used later.
		}
	}

	return this;

}
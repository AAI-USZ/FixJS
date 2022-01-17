function(url,callback)
	{
		console.log("Unsubscribe : " + url);
		/* Unsubscribe to feed locally */
		if(FeedController.removeFeed(url))
			callback();
		
		/* Unsubscribe from the local database */
		DbManager.removeSubscription(url);

		/* Unsubscribe from Google reader */
		if(GoogleReader.hasAuth() == true)
		GoogleReader.unsubscribe(url,function(){
			console.log("Feed Unsubscribed successfully");
			});
	}
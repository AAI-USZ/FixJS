function(feedinfo)
	{
		/* Subscribe to Feed Locally */
		FeedController.addFeed(feedinfo);
		
		/* Subscribe to feed in the Local Database */
		DbManager.insertSubscription(feedinfo.id,feedinfo.title,null);

		/* Subscribe on Google Reader */
		if(GoogleReader.hasAuth() == true)
			GoogleReader.subscribe(feedinfo.id,feedinfo.title,false);
	}
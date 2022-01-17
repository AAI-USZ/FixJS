function(feedinfo)
	{
		/* Subscribe to Feed Locally */
		FeedController.addFeed(feedinfo);
	
		/* Subscribe on Google Reader */
		if(GoogleReader.hasAuth() == true)
			GoogleReader.subscribe(feedinfo.id,feedinfo.title,false);
	}
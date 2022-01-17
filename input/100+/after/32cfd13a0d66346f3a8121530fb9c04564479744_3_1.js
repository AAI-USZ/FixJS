function(myFeedsList){
				/* Callback function for the getSubscriptionIds from database*/
				for(var i =0;i<data.unreadcounts.length;i++){
				var feed = data.unreadcounts[i];
				if((feed.id).indexOf("feed/") == 0)
				{
					console.log(feed.id + " : " + feed.count);
					//pokki.rpc('DbManager.updateUnreadCount',(feed.id).substr(5),feed.count);
					DbManager.updateUnreadCount((feed.id).substr(5),feed.count);
					if(myFeedsList != null)
					{
						for(var j=0;j<myFeedsList.length;j++)
							if(myFeedsList[j] == (feed.id).substr(5))
							{
								myFeedsList.splice(j, 1);
								break;
							}
					}
					totalCount+=feed.count;
				}
			}
			var flag = false;
			for(var i =0;myFeedsList!=null && i<myFeedsList.length;i++){
				DbManager.updateUnreadCount(myFeedsList[i],0);
				flag = true;
			}
			if(totalCount != BackgroundWorker.prevTotalCount || flag)
			{
				console.log("Triggering update of feed count.");
				pokki.rpc('FeedViewer.updateFeedCount()');
				BackgroundWorker.prevTotalCount = totalCount;
			}
			if(totalCount > 0 && totalCount<1000)
				pokki.setIconBadge(totalCount);
			else if(totalCount > 1000)
				pokki.setIconBadge(999);
			else
				pokki.removeIconBadge();
			if(GoogleReader.hasAuth() == true)
				setTimeout("BackgroundWorker.updateFromGoogle()",5000*3);
			}
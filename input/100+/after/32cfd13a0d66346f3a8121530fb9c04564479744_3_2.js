function(){
		console.log("Marking all as read");
		var replyCount = 0;
		DbManager.getSubscriptionIds(function(list){
			if(list){
				for(var i=0;i<list.length;i++)
					GoogleReader.markAllAsRead(list[i],function(){
						DbManager.updateUnreadCount(list[i],0);
						replyCount++;
						console.log("Marked all read");
						if(replyCount >=(list.length-1))
							pokki.rpc('FeedViewer.updateFeedCount()');
					});
			}									  
		});
	}
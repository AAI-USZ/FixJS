function(i){

				if($.inArray($(this).attr('data-id'),myFeedsList)!=-1)

				//if(myFeedsList.indexOf($(this).attr('data-id')) != -1)

					showSubscribedFeed($(this));

				else

					showUnsubscribedFeed($(this));

				}
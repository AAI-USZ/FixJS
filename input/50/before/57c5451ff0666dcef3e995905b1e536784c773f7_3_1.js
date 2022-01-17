function(response){

			if(response == "OK"){

				addContextMenu();

				//Start background polling for unread count

				pokki.rpc('FeedLoader.updateFromGoogle()');

				Reader.syncSubscriptions();

			}

			}
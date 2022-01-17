function(response){

			if(response == "OK"){

				addContextMenu();

				//Start background polling for unread count

				pokki.rpc('BackgroundWorker.updateFromGoogle()');

				Reader.syncSubscriptions();

				window.localStorage.setItem("isSyncOn","true");

		}

			}
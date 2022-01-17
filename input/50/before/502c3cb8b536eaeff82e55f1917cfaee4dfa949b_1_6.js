function() {

			isSyncing = false;
			isLive = !(Cache.isActive() && !Cache.isOnline());
		
			Log.info("Unsaved data pushed to server.");
			
		}
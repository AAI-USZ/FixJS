function() {

			isSyncing = false;
			isLive = !(Cache.isActive() && !Cache.isOnline());
		
			Log.info("Synced with server");
			
		}
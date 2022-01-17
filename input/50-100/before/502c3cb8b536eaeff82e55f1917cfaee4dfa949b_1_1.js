function(e) {
						
			if (e.data == 1 && !isSyncing) {
				this.onSync();				
			} else {
				if (isSyncing) {
					this.onSyncFailure.call(this);
				} else {
					isLive = !(Cache.isActive() && !Cache.isOnline());
				}
			}
			
		}
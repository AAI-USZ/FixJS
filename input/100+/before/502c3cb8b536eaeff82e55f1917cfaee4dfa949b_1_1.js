function(e) {
								
				if (!this.isLoaded) return;
				
				if (e.data == 1) {
					Storage.goOnline();
					PersistenceManager.init();
					if (this.config.location) Location.get();
					this.onOnline.call(this);
				} else {
					Storage.goOffline();
					this.onOffline.call(this);
				}
				
			}
function(e) {
								
				if (!this.isLoaded) return;
				
				if (e.data == 1) {
					Storage.goOnline();
					if (this.config.location) Location.get();
					this.onOnline.call(this);
					Log.info('Application went online');
				} else {
					Storage.goOffline();
					this.onOffline.call(this);
					Log.info('Application went offline');
				}
				
				// handle versioning
				if (Storage.get('appVersion') !== this.config.version) {
					PersistenceManager.flush();
					Storage.set('appVersion', this.config.version);
				}
				
			}
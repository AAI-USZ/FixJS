function() {
			
			// bind caching event
			Cache.on('statusChange', Class.proxy(function(e) {
				
				// detach one time event
				Cache.detach();
				
				// set online status
				this._isOnline = e.data == 1;
						
				if (!this.loaded) this.fire('_complete', AppState.STORAGE);
														
			}, this));
			
			// setup caching
			Cache.init();
						
		}
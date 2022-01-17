function(name, config) {
			
			this.name = name.replace(/[^A-Za-z:0-9_\[\]]/g);
			this.config = config;
			this.isOnline = false;
			this.isLoaded = false;

			// load dependencies
			for (var i = 0, len = this.config.required.length; i < len; i++) {
				Loader.loadModule(this.config.required[i]);
			}
			
			// bind onload to window
			window.onload = Class.proxy(function() {
				this.isLoaded = true;
				PersistenceManager.init();
				Cache.init();
				this.onLoad();
			}, this);
			
			// set logging
			if (this.config.hasOwnProperty('logging')) Log.setLevel(this.config.logging);
			
			// bind offline events
			Cache.on('statusChange', Class.proxy(function(e) {
								
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
				
			}, this));
		}
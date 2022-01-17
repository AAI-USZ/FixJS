function() {
				this.isLoaded = true;
				PersistenceManager.init();
				Cache.init();
				this.onLoad();
			}
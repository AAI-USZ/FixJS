function() {
						
			isLive = !(Cache.isActive() && !Cache.isOnline());
			
			this.cacheDS = new LocalStorageSource({ name: 'cache' });
			this.createDS = new PersistentStorageSource({ name: 'create' });
			this.updateDS = new PersistentStorageSource({ name: 'update' });
			this.deleteDS = new PersistentStorageSource({ name: 'delete' });
			this.pendingDS = new PersistentStorageSource({ name: 'pending' });
			
			Cache.on('statusChange', Class.proxy(this.onStatusChange, this));
			
		}
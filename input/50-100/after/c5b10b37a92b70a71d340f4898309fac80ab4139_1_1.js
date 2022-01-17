function(e){
			_.assertInt(e.requestId)
			//console.log('set newSyncId listener =============================')
			var cb = getRequestCallback(e);
			syncListenersBySyncId[e.syncId] = syncListenersByRequestId[e.requestId]
			_.assertFunction(syncListenersBySyncId[e.syncId].edit)
			_.assertFunction(syncListenersBySyncId[e.syncId].object)
			delete syncListenersByRequestId[e.requestId]
			cb(e.syncId);
		}
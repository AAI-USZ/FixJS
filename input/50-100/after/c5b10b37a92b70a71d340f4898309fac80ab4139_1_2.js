function(e){
			//console.log('tcpclient got response update: ' + JSON.stringify(e))
			//var cb = syncListenerCallbacks[e.requestId];
			_.assertInt(e.destinationSyncId)
			var cb = syncListenersBySyncId[e.destinationSyncId]
			_.assertFunction(cb.edit);
			_.assertFunction(cb.object);
			var r = fparse.makeSingleReader(e.edit)
			e.edit = fp.readers[e.op](r)
			_.assertInt(e.editId)
			cb.edit(e);
		}
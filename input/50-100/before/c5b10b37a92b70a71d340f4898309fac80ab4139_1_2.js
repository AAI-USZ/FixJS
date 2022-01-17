function(e){
			//console.log('tcpclient got response ready(' + e.syncId + '): ' + JSON.stringify(e))
			var cb = syncReadyCallbacks[e.requestId];
			_.assertFunction(cb);
			cb(e);
		}
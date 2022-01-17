function(cb){
			_.assertFunction(cb);
			var e = {};
			applyRequestId(e, cb);
			w.makeSyncId(e);
			w.flush();
		}
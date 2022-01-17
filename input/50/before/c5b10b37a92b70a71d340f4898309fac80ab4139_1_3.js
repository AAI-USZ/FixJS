function(e, cb){
			_.assertFunction(cb)
			applyRequestId(e, cb);
			w.getSnapshot(e);
			w.flush()
		}
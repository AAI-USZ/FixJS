function(err, proc) {
	    if(err) {
		psm.log.error(err, 'Failed to start minecraft process.');
		if(cb) cb(err);
		return;
	    }

	    if(cb) cb(null);
	}
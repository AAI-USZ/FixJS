function(err, proc) {
	    if(err) {
		psm.log.error(err, 'Failed to start minecraft process.');
		if(cb) cb(err);
		return;
	    }

	    self.outputs.setStream(proc.stderr);

	    if(cb) cb(null);
	}
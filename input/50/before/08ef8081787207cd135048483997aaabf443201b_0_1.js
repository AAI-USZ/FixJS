function(err) {
	    //if(err) psm.log.error(err, 'Error executing command: %s', cmd);

	    res.json({ success: !err, error: (err ? err.message : null) });
	}
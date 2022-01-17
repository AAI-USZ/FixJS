function (err,data) {
		if (!err && data) { res.end(data); }	
		else res.end();
	}
function () {
		if ((req.readyState == 4) && (req.status == 200)) {
		    callback(req);}}
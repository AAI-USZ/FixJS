function () {
		if ((req.readyState == 4) && (req.status == 200)) {
		    success_callback(req);}
		else if (other_callback) other_callback(req);}
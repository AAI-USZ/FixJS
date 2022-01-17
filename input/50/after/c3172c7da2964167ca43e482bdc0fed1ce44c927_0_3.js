function(err, docs) {
		if (!err) {
		    var votes = docs.length;
		    cb(null, {"Votes cast": votes});
		} else {
		    cb(err, null);
		}
	    }
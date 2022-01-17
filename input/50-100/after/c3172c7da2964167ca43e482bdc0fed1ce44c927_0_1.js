function(err, docs) {
		if (!err) {
		    var newdef = docs.length;
		    cb(null, {"New definitions": newdef});
		} else {
		    cb(err, null);
		}
	    }
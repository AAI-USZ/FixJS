function(err, docs) {
		var newdef = docs.length;
		cb(null, {"New definitions": newdef});
	    }
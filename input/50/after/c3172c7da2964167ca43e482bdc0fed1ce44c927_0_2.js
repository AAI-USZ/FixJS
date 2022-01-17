function(err, docs) {
		if (!err) {
		    var wordadd = docs.length;
		    cb(null, {"Words added": wordadd});
		} else {
		    cb(err, null);
		}
	    }
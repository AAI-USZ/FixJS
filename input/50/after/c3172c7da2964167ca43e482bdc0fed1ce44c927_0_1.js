function(err, docs) {
		if (!err) {
		    var wordviews = docs.length;
		    cb(null, {"Word views": wordviews});
		} else {
		    cb(err, null);
		}
	    }
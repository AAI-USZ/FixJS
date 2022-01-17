function(err, docs) {
		var wordviews = docs.length;
		cb(null, {"Word views": wordviews});
	    }
function(err, s) {
			if(err || !s) return fn(err);
			fn(err, new Session(s, this, socketIndex[sid]));
		}
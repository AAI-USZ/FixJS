function(err, s) {
			if(err || !s) return fn(err);
			var sess = sessionIndex[sid] || new Session(s, store, socketIndex[sid]);
			sessionIndex[sid] = sess;
			fn(err, sess);
		}
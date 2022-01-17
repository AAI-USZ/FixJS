function(sid, fn) {
	var socketIndex = this.socketIndex
		,	store = this;

	if(typeof sid == 'function') {
		fn = sid;
		sid = undefined;
	}
	if(sid) {
		this.find({id: sid}, function(err, s) {
			if(err || !s) return fn(err);
			var sess = sessionIndex[sid] || new Session(s, store, socketIndex[sid]);
			sessionIndex[sid] = sess;
			fn(err, sess);
		});
	} else {
		sid = this.createUniqueIdentifier();
		var sess = sessionIndex[sid] = new Session({id: sid}, this, socketIndex[sid]);
		fn(null, sess);
		this.insert({id: sid}, function(err, s) {
			if(err) console.error(err);
		});
	}
}
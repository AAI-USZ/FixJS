function(sid, fn) {
	var socketIndex = this.socketIndex;

	if(typeof sid == 'function') {
		fn = sid;
		sid = undefined;
	}
	if(sid) {
		this.find({id: sid}, function(err, s) {
			if(err || !s) return fn(err);
			fn(err, new Session(s, this, socketIndex[sid]));
		});
	} else {
		sid = this.createUniqueIdentifier();
		fn(null, new Session({id: sid}, this, socketIndex[sid]));
		this.insert({id: sid}, function(err, s) {
			if(err) console.error(err);
		});
	}
}
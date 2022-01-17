function (sid, cb) {
	cb = _default(cb);
	_collection.findAndModify(
		{_id: sid},
		{},
		{$set: {'session.lastAccess':new Date().getTime()}},
		function (err, data) {
			try {
				if (data) {
					var sess =  data.session;
					cb(null, sess);
				} else {
					cb();
				}
			} catch (exc) {
				cb(exc);
			}
		});
}
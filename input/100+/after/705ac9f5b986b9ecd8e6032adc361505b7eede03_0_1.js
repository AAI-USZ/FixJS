function (sid, cb)
{
	//Check to see if collection exists yet
	//if not we better wait for a bit.
	if (!_collection)
	{
		setTimeout(function(){getSession(sid, cb)}, 250);
		return;
	}

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
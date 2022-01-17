function (info, callback) {
	if (!info.src)
		return callback(null);
	/* Just in case */
	var m = /^\d+\w*\.\w+$/;
	if (!info.src.match(m))
		return callback(Muggle('Invalid image.'));
	var mvs = [mv.bind(null, 'src', info.src)];
	function try_thumb(t) {
		if (!t)
			return;
		if (!t.match(m))
			return callback(Muggle('Invalid thumbnail.'));
		mvs.push(mv.bind(null, 'thumb', t));
	}
	try_thumb(info.thumb);
	try_thumb(info.realthumb);
	async.parallel(mvs, callback);
	function mv(p, nm, cb) {
		mv_file(media_path(p, nm), dead_path(p, nm), cb);
	}
}
function allocate_post(msg, client, callback) {
	if (client.post)
		return callback("Already have a post.");
	if (['graveyard', 'archive'].indexOf(client.board) >= 0)
		return callback("Can't post here.");
	var post = {time: new Date().getTime(), nonce: msg.nonce};
	var body = '';
	var ip = client.ident.ip;
	var extra = {ip: ip, board: client.board};
	var image_alloc;
	if (msg.image) {
		if (!msg.image.match(/^\d+$/))
			return callback('Bad image token.');
		image_alloc = msg.image;
	}
	if (msg.frag) {
		if (msg.frag.match(/^\s*$/g))
			return callback('Bad post body.');
		if (msg.frag.length > common.MAX_POST_CHARS)
			return callback('Post is too long.');
		body = msg.frag.replace(config.EXCLUDE_REGEXP, '');
		if (config.GAME_BOARDS.indexOf(client.board) >= 0)
			amusement.roll_dice(body, post, extra);
	}

	if (msg.op)
		post.op = msg.op;
	else if (!image_alloc)
		return callback('Image missing.');

	/* TODO: Check against client.watching? */
	if (msg.name) {
		var parsed = common.parse_name(msg.name);
		post.name = parsed[0];
		var spec = STATE.hot.SPECIAL_TRIPCODES;
		if (spec && parsed[1] && parsed[1] in spec) {
			post.trip = spec[parsed[1]];
		}
		else if (parsed[1] || parsed[2]) {
			var trip = tripcode.hash(parsed[1], parsed[2]);
			if (trip)
				post.trip = trip;
		}
	}
	if (msg.email) {
		post.email = msg.email.trim().substr(0, 320);
		if (common.is_noko(post.email))
			delete post.email;
	}
	post.state = [common.S_BOL, 0];

	if ('auth' in msg) {
		if (!msg.auth || !client.ident
				|| msg.auth !== client.ident.auth)
			return callback('Bad auth.');
		post.auth = msg.auth;
	}

	if (post.op)
		throttled(null);
	else
		client.db.check_throttle(ip, throttled);

	function throttled(err) {
		if (err)
			return callback(err);
		client.db.reserve_post(post.op, ip, got_reservation);
	}

	function got_reservation(err, num) {
		if (err)
			return callback(err);
		if (client.post)
			return callback('Already have a post.');
		client.post = post;
		post.num = num;
		var supplements = {
			links: valid_links.bind(null, body, post.state,
					client.ident),
		};
		if (image_alloc)
			supplements.image = client.db.obtain_image_alloc.bind(
					client.db, image_alloc);
		async.parallel(supplements, got_supplements);
	}
	function got_supplements(err, rs) {
		if (err) {
			winston.error('supplements: ' + err);
			if (client.post === post)
				client.post = null;
			return callback("Attachment error.");
		}
		post.links = rs.links;
		if (rs.image)
			extra.image_alloc = rs.image;
		client.db.insert_post(post, body, extra, inserted);
	}
	function inserted(err) {
		if (err) {
			if (client.post === post)
				client.post = null;
			winston.error(err);
			return callback("Couldn't allocate post.");
		}
		post.body = body;
		callback(null, get_post_view(post));
	}
	return true;
}
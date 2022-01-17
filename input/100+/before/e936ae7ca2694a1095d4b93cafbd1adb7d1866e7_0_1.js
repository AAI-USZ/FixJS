function (msg, body, extra, callback) {
	var r = this.connect();
	if (!this.tag)
		return callback("Can't retrieve board for posting.");
	var self = this;
	var ip = extra.ip, board = extra.board, num = msg.num, op = msg.op;
	if (!num)
		return callback("No post num.");
	else if (!ip)
		return callback("No IP.");
	else if (op && OPs[op] != op) {
		delete OPs[num];
		return callback('Thread does not exist.');
	}

	var view = {time: msg.time, ip: ip, state: msg.state.join()};
	var tagKey = 'tag:' + tag_key(this.tag);
	if (msg.name)
		view.name = msg.name;
	if (msg.trip)
		view.trip = msg.trip;
	if (msg.email)
		view.email = msg.email;
	if (msg.auth)
		view.auth = msg.auth;
	if (op)
		view.op = op;
	else {
		view.tags = tag_key(board);
		if (board == config.STAFF_BOARD)
			view.immortal = 1;
	}

	if (extra.image_alloc) {
		msg.image = extra.image_alloc.image;
		if (!op == msg.image.pinky)
			return callback("Image is the wrong size.");
		delete msg.image.pinky;
	}

	var key = (op ? 'post:' : 'thread:') + num;
	var bump = !op || !common.is_sage(view.email);
	var m = r.multi();
	m.incr(tagKey + ':postctr'); // must be first
	if (bump)
		m.incr(tagKey + ':bumpctr');
	m.sadd('liveposts', key);
	var self = this;
	inline(view, msg, function (err) {
		if (err)
			return callback(err);
		if (msg.image) {
			if (op)
				m.hincrby('thread:' + op, 'imgctr', 1);
			else
				view.imgctr = 1;
			note_hash(m, msg.image.hash, msg.num);
			make_image_nontemporary(m, extra.image_alloc);
		}
		m.hmset(key, view);
		m.set(key + ':body', body);
		if (msg.links)
			m.hmset(key + ':links', msg.links);

		var etc = {augments: {}, cacheUpdate: {}};
		var priv = self.ident.priv;
		if (op) {
			etc.cacheUpdate.num = num;
			var pre = 'thread:' + op;
			if (priv) {
				m.sadd(pre + ':privs', priv);
				m.rpush(pre + ':privs:' + priv, num);
			}
			else
				m.rpush(pre + ':posts', num);
		}
		else {
			// TODO: Add to alternate thread list?
			// set conditional hide?
			op = num;
			if (!view.immortal) {
				var score = expiry_queue_score(msg.time);
				var entry = num + ':' + tag_key(self.tag);
				m.zadd(expiry_queue_key(), score, entry);
			}
			/* Rate-limit new threads */
			if (ip != '127.0.0.1')
				m.setex('ip:'+ip, config.THREAD_THROTTLE, op);
		}

		/* Denormalize for backlog */
		view.nonce = msg.nonce;
		view.body = body;
		if (msg.links)
			view.links = msg.links;

		async.waterfall([
		function (next) {
			extract(view, next);
		},
		function (v, next) {
			view = v;
			delete view.ip;

			if (ip) {
				var n = post_volume(view, body);
				if (n > 0)
					update_throughput(m, ip, view.time, n);
				etc.augments.auth = {ip: ip};
			}

			self._log(m, op, common.INSERT_POST, [num, view], etc);

			m.exec(next);
		},
		function (results, next) {
			if (!bump)
				return next();
			var postctr = results[0];
			r.zadd(tagKey + ':threads', postctr, op, next);
		}],
		function (err) {
			if (err) {
				delete OPs[num];
				return callback(err);
			}
			callback(null);
		});
	});
}
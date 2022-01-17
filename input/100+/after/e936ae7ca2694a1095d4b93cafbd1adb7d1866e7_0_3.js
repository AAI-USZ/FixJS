function (op, callback) {
	if (OPs[op] != op)
		return callback(Muggle('Thread does not exist.'));
	var r = this.connect();
	var key = 'thread:' + op, dead_key = 'dead:' + op;
	var graveyardKey = 'tag:' + tag_key('graveyard');
	var privs = null;
	var etc = {cacheUpdate: {}};
	var self = this;
	async.waterfall([
	function (next) {
		get_all_replies_and_privs(r, op, next);
	},
	function (nums, threadPrivs, next) {
		etc.cacheUpdate.nums = nums;
		privs = threadPrivs;
		if (!nums || !nums.length)
			return next(null, []);
		tail.map(nums, self.remove_post.bind(self, false), next);
	},
	function (dels, next) {
		var m = r.multi();
		m.incr(graveyardKey + ':bumpctr');
		m.hget(key, 'tags');
		m.exec(next);
	},
	function (rs, next) {
		var deadCtr = rs[0], tags = parse_tags(rs[1]);
		/* Rename thread keys, move to graveyard */
		var m = r.multi();
		var expiryKey = expiry_queue_key();
		tags.forEach(function (tag) {
			var tagKey = tag_key(tag);
			m.zrem(expiryKey, op + ':' + tagKey);
			m.zrem('tag:' + tagKey + ':threads', op);
		});
		m.zadd(graveyardKey + ':threads', deadCtr, op);
		etc.tags = tags;
		self._log(m, op, common.DELETE_THREAD, [], etc);
		m.hset(key, 'hide', 1);
		/* Next two vals are checked */
		m.renamenx(key, dead_key);
		m.renamenx(key + ':history', dead_key + ':history');
		m.exec(next);
	},
	function (results, done) {
		var dels = results.slice(-2);
		if (dels.some(function (x) { return x === 0; }))
			return done("Already deleted?!");
		delete OPs[op];
		delete TAGS[op];

		/* Extra renames now that we have renamenx exclusivity */
		var m = r.multi();
		m.rename(key + ':posts', dead_key + ':posts');
		m.rename(key + ':links', dead_key + ':links');
		if (privs.length) {
			m.rename(key + ':privs', dead_key + ':privs');
			privs.forEach(function (priv) {
				var suff = ':privs:' + priv;
				m.rename(key + suff, dead_key + suff);
			});
		}
		m.exec(function (err) {
			done(err, null); /* second arg is remove_posts dels */
		});
		/* Background, might not even be there */
		self.finish_quietly(dead_key, warn);
		self.hide_image(dead_key, warn);
	}], callback);
}
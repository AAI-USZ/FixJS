function update_cache(chan, msg) {
	msg = JSON.parse(msg);
	var op = msg.op, kind = msg.kind, tag = msg.tag;

	if (kind == common.INSERT_POST) {
		if (msg.num)
			OPs[msg.num] = op;
		else
			add_OP_tag(config.BOARDS.indexOf(tag), op);
	}
	else if (kind == common.MOVE_THREAD) {
		set_OP_tag(config.BOARDS.indexOf(tag), op);
	}
	else if (kind == common.DELETE_POSTS) {
		msg.nums.forEach(function (num) {
			delete OPs[num];
		});
	}
	else if (kind == common.DELETE_THREAD) {
		msg.nums.forEach(function (num) {
			delete OPs[num];
		});
		delete TAGS[op];
	}
	else if (kind == common.UPDATE_BANNER) {
		cache.bannerState = {tag: tag, op: op, message: msg.msg};
	}
}
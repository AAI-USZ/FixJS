function (data) {
	var msg;
	try { msg = JSON.parse(data); }
	catch (e) {}
	var type = common.INVALID;
	if (msg) {
		if (this.post && typeof msg == 'string')
			type = common.UPDATE_POST;
		else if (msg.constructor == Array)
			type = msg.shift();
	}
	if (!this.synced && type != common.SYNCHRONIZE)
		type = common.INVALID;
	var func = dispatcher[type];
	if (!func || !func(msg, this)) {
		this.report(db.Muggle("Bad protocol.", new Error(
				"Invalid message: " + JSON.stringify(data))));
	}
}
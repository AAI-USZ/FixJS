function (error) {
	var msg = 'Server error.';
	if (error instanceof db.Muggle) {
		msg = error.most_precise_error_message();
		error = error.deepest_reason();
	}
	winston.error('Error by ' + JSON.stringify(this.ident) + ': '
			+ (error || msg));
	this.send([0, common.INVALID, msg]);
	this.synced = false;
}
function report(error, client, client_msg) {
	var error_db = new db.Yakusoku(null, db.UPKEEP_IDENT);
	var msg = client_msg || 'Server error.';
	var ip = client && client.ident.ip;
	winston.error('Error by ' + ip + ': ' + (error || msg));
	if (client) {
		client.send([0, common.INVALID, msg]);
		client.synced = false;
	}
}
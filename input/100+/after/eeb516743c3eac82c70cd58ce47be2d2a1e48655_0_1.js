function synchronize(msg, client) {
	if (msg.length != 4)
		return false;
	var id = msg[0], board = msg[1], syncs = msg[2], live = msg[3];
	if (!id || typeof id != 'number' || id < 0 || Math.round(id) != id)
		return false;
	if (id in clients) {
		winston.error("Duplicate client id " + id);
		return false;
	}
	client.id = id;
	clients[id] = client;
	if (!syncs || typeof syncs != 'object')
		return false;
	if (client.synced) {
		//winston.warn("Client tried to sync twice");
		/* Sync logic is buggy; allow for now */
		//return true;
	}
	if (!board || !caps.can_access_board(client.ident, board))
		return false;
	var dead_threads = [], count = 0, op;
	for (var k in syncs) {
		if (!k.match(/^\d+$/))
			return false;
		k = parseInt(k, 10);
		if (!k || typeof syncs[k] != 'number')
			return false;
		if (db.OPs[k] != k || !db.OP_has_tag(board, k)) {
			delete syncs[k];
			dead_threads.push(k);
		}
		op = k;
		if (++count > config.THREADS_PER_PAGE) {
			/* Sync logic isn't great yet; allow this for now */
			// return false;
		}
	}
	client.watching = syncs;
	if (live) {
		/* XXX: This will break if a thread disappears during sync
		 *      (won't be reported)
		 * Or if any of the threads they see on the first page
		 * don't show up in the 'live' pub for whatever reason.
		 * Really we should get them synced first and *then* switch
		 * to the live pub.
		 */
		client.watching = {live: true};
		count = 1;
	}
	client.board = board;

	if (client.db)
		client.db.disconnect();
	client.db = new db.Yakusoku(board, client.ident);
	/* Race between subscribe and backlog fetch; client must de-dup */
	client.db.kiku(client.watching, client.on_update.bind(client),
			client.on_thread_sink.bind(client), listening);
	function listening(errs) {
		if (errs && errs.length >= count)
			return report("Couldn't sync to board.", client);
		else if (errs) {
			dead_threads.push.apply(dead_threads, errs);
			errs.forEach(function (thread) {
				delete client.watching[thread];
			});
		}
		client.db.fetch_backlogs(client.watching, got_backlogs);
	}
	function got_backlogs(errs, logs) {
		if (errs) {
			dead_threads.push.apply(dead_threads, errs);
			errs.forEach(function (thread) {
				delete client.watching[thread];
			});
		}

		var sync = '0,' + common.SYNCHRONIZE;
		if (dead_threads.length)
			sync += ',' + JSON.stringify(dead_threads);
		logs.push(sync);
		client.socket.write('[[' + logs.join('],[') + ']]');
		client.synced = true;

		var info = {client: client, live: live, count: count, op: op};
		hooks.trigger('clientSynced', info, function (err) {
			if (err)
				winston.error(err);
		});
	}
	return true;
}
function debug_command(client, frag) {
	if (!frag)
		return;
	if (frag.match(/\bfail\b/))
		client.report(db.Muggle("Failure requested."));
	else if (frag.match(/\bclose\b/))
		client.socket.close();
}
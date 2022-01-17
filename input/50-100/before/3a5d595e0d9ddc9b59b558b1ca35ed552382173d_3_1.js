function send(address, port, message) {
	var buf;
	message.v = this.version;
	util.debug('Sending (to %s:%s): %j', address, port, message);
	try {
		buf = bencode.bencode(message);
		this.socket4.send(buf, 0, buf.length, port, address);
	} catch (e) {
		console.log("Couldn't send: %s", e.stack);
	}
}
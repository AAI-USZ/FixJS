function(conn, data) {
	try {
		conn.pause();
		this.processMsg(conn, data);
		conn.resume();
	} catch (err) {
		log(this.sessionId, 'ERROR ', '[PZH] Exception in processing recieved message ' + err);
	}
}
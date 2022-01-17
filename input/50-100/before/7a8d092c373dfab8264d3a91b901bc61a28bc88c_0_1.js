function(conn, buffer) {
	var self = this;
	
	try {
		conn.pause();
		
		session.common.readJson(self, buffer, function(obj) {
			self.processMsg(conn, obj);
		});
	} catch (err) {
		log(this.sessionId, 'ERROR ', '[PZH] Exception in processing recieved message ' + err);
	} finally {
		conn.resume();
	}
}
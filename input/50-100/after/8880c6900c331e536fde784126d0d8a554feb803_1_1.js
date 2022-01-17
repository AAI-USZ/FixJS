function(buffer) {
		try {
			pzpInstance.pause(); // This pauses socket, cannot receive messages
			
			session.common.readJson(self, buffer, function(obj) {
				self.processMsg(obj, callback);
			});
		} catch (err) {
			log('ERROR', '[PZP] Exception ' + err);
		} finally {
			pzpInstance.resume();// unlocks socket.
		}
	}
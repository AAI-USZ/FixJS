function(data) {
		try {
			pzpInstance.pause(); // This pauses socket, cannot receive messages
			self.processMsg(data, callback);
			pzpInstance.resume();// unlocks socket.
		} catch (err) {
			log('ERROR', '[PZP] Exception ' + err);

		}
	}
function(validMsgObj) {
		log(self.sessionId, 'DEBUG', '[PZH -'+self.sessionId+'] Received message' + JSON.stringify(validMsgObj));
		// Message sent by PZP connecting first time based on this message it generates client certificate
		if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'clientCert' ) {
			self.addNewPZPCert(validMsgObj, function(err, msg) {
				if (err !== null) {
					log(self.sessionId, 'INFO', err);
					return;
				} else {
					self.sendMessage(msg, validMsgObj.from, conn);
				}
			});
		}
		// information sent by connecting PZP about services it supports. These details are then used by findServices 
		else if(validMsgObj.type === "prop" && validMsgObj.payload.status === 'registerServices') {
			log(self.sessionId, 'INFO', '[PZH -'+ self.sessionId+'] Receiving Webinos Services from PZP...');
			self.rpcHandler.addRemoteServiceObjects(validMsgObj.payload.message);
		}
		// Send findServices information to connected PZP..
		else if(validMsgObj.type === "prop" && validMsgObj.payload.status === 'findServices') {
			log(self.sessionId, 'INFO', '[PZH -'+ self.sessionId+'] Trying to send Webinos Services from this RPC handler to ' + validMsgObj.from + '...');
			var services = self.rpcHandler.getAllServices(validMsgObj.from);
			var msg = self.prepMsg(self.sessionId, validMsgObj.from, 'foundServices', services);
			msg.payload.id = validMsgObj.payload.message.id;
			self.sendMessage(msg, validMsgObj.from);
			log(self.sessionId, 'INFO', '[PZH -'+ self.sessionId+'] Sent ' + (services && services.length) || 0 + ' Webinos Services from this RPC handler.');
		}
		// Message is forwarded to Messaging manager
		else {
			try {
				self.messageHandler.onMessageReceived(validMsgObj, validMsgObj.to);
			} catch (err2) {
				log(self.sessionId, 'ERROR', '[PZH -'+ self.sessionId+'] Error Message Sending to Messaging ' + err2);
				return;
			}
		}
	}
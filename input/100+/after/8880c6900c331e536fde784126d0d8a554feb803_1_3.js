function(validMsgObj) {
		if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'signedCert') {
			log('INFO', '[PZP -'+self.sessionId+'] PZP Writing certificates data ');
			self.config.conn.cert   = validMsgObj.payload.message.clientCert;
			self.config.master.cert = validMsgObj.payload.message.masterCert;

			configuration.storeConfig(self.config, function() {
				callback.call(self, 'startPZPAgain');
			});

		} // This is update message about other connected PZP
		else if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'pzpUpdate') {
			log('INFO', '[PZP -'+self.sessionId+'] Update PZPs details') ;
			msg = validMsgObj.payload.message;
			for (var i in msg) {
				if (msg.hasOwnProperty(i) && self.sessionId !== msg[i].name) {
					if(!self.connectedPzp.hasOwnProperty(msg[i].name)) {

						self.connectedPzp[msg[i].name] = {'address': msg[i].address, 'port': msg[i].port};
						self.connectedPzpIds.push(msg[i].name);

						if(msg[i].newPzp) {
							pzp_server.connectOtherPZP(self, msg[i]);
						}
						self.wsServerMsg("Pzp Joined " + msg[i].name);
						self.prepMsg(self.sessionId, self.sessionWebAppId, 'update', {pzp: msg[i].name });
					}
				}
			}
		} else if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'failedCert') {
			log('ERROR', '[PZP -'+ self.sessionId+']Failed to get certificate from PZH');
			callback.call(self, "ERROR");

		} else if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'foundServices') {
			log('INFO', '[PZP -'+self.sessionId+'] Received message about available remote services.');
			this.serviceListener && this.serviceListener(validMsgObj.payload);
		}
		// Forward message to message handler
		else {
			self.messageHandler.onMessageReceived(validMsgObj, validMsgObj.to);
		}
	}
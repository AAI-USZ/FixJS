function(message) { // 1 is for #
		for (var j = 1 ; j < (message.length-1); j += 1 ) {
			if (message[j] === '') {
				continue;
			}

			var parseMsg = JSON.parse(message[j]);
			if(parseMsg.type === 'prop' && parseMsg.payload.status === 'signedCert') {
				log('INFO', '[PZP -'+self.sessionId+'] PZP Writing certificates data ');
				self.config.conn.cert   = parseMsg.payload.message.clientCert;
				self.config.master.cert = parseMsg.payload.message.masterCert;

				session.configuration.storeConfig(self.config, function() {
					callback.call(self, 'startPZPAgain');
				});

			} // This is update message about other connected PZP
			else if(parseMsg.type === 'prop' && parseMsg.payload.status === 'pzpUpdate') {
				log('INFO', '[PZP -'+self.sessionId+'] Update PZPs details') ;
				msg = parseMsg.payload.message;
				for ( var i in msg) {
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
			} else if(parseMsg.type === 'prop' && parseMsg.payload.status === 'failedCert') {
				log('ERROR', '[PZP -'+ self.sessionId+']Failed to get certificate from PZH');
				callback.call(self, "ERROR");

			} else if(parseMsg.type === 'prop' && parseMsg.payload.status === 'foundServices') {
				log('INFO', '[PZP -'+self.sessionId+'] Received message about available remote services.');
				this.serviceListener && this.serviceListener(parseMsg.payload);
			}
			// Forward message to message handler
			else {
				self.messageHandler.onMessageReceived( parseMsg, parseMsg.to);
			}
		}
	}
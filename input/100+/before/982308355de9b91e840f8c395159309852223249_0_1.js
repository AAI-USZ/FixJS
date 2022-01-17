function () {
			var webApp;
			log('INFO', '[PZP -'+ self.sessionId+'] Connection terminated');
			if (typeof self.sessionId !== "undefined") {
				self.messageHandler.removeRoute(self.pzhId, self.sessionId);
			
				delete self.connectedPzh[self.pzhId];
				delete self.connectedPzp[self.sessionId];
	
				self.pzhId     = '';
				self.sessionId = self.config.details.name;
				self.rpcHandler.setSessionId(self.sessionId);

				websocket.updateInstance(instance);

				for ( webApp in self.connectedWebApp ) {
					if (self.connectedWebApp.hasOwnProperty(webApp)) {
						var addr = self.sessionId + '/' + websocket.webId;
						websocket.webId += 1;
						websocket.connectedApp[addr] = self.connectedWebApp[webApp];
						var payload = {type:"prop", from:self.sessionId, to: addr, payload:{status:"registeredBrowser"}};
						websocket.connectedApp[addr].sendUTF(JSON.stringify(payload));
					}
				}
			}			
			// TODO: Try reconnecting back to server but when.
		}
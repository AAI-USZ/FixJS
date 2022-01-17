function (parse, cb) {
	var self = this;
	try {
		// Check QRCode if it is valid ..
		self.expecting.isExpectedCode(parse.payload.message.code, function(expected) {
			if (expected) {
				// Sign certificate based on received csr from client.
				// Also includes master key and master certificate for signing the certificate
				session.configuration.signedCert(parse.payload.message.csr, self.config, parse.payload.message.name, 2, function(config) { // pzp = 2
					// unset expected QRCode
					self.expecting.unsetExpected(function() {
						// Send signed certificate and master certificate to PZP
						var payload = {'clientCert': config.signedCert[parse.payload.message.name], 'masterCert':self.config.master.cert};
						var msg = self.prepMsg(self.sessionId, parse.from, 'signedCert', payload);
						// update configuration with signed certificate details ..
						cb.call(self, null, msg);
					});
				});
			} else {
				// Fail message
				var payload = {};
				var msg = self.prepMsg(self.sessionId, parse.from, 'failedCert', payload);
				log(self.sessionId, 'INFO', '[PZH -'+self.sessionId+'] Failed to create client certificate: not expected code, please generate via PZH');
				cb.call(self, null, msg);
			}
		});

	} catch (err) {
		log(self.sessionId, 'ERROR', '[PZH -'+self.sessionId+'] Error Signing Client Certificate' + err);
		cb.call(self, "Could not create client certificate");
	}
}
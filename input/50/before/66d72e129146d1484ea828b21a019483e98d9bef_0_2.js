function(presetJid) {
		self.notifyObservers(self.KEYS.LOGIN, { presetJid: presetJid } );
	}
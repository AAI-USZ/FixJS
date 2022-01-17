function(callback) {
		self.session.send_command({
			send : function() {
				return "\x04" + self.id +"\0"
			},
			parser : self.session.readiter,
			callback : callback
		});
	}
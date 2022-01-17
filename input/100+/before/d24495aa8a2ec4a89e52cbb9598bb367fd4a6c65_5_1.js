function(callback) {
		self.session.send_command({
			send : function() { // send is function as needs id
				return "\x02" + self.id +"\0"
			},
			parser : self.session.parser2,
			callback : callback
		});
	}
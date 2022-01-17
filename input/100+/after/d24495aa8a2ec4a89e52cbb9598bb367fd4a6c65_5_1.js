function Query(session, query) {
	this.session = session;
	this.query = query;
	this.id = null;
	this.cache = [];
	this.state = "type";
	var self = this;

	this.close = function(callback) {
		self.session.send_command({
			send : function() { // send is function as needs id
				return "\x02" + self.id + "\0"
			},
			parser : self.session.parser2,
			callback : callback
		});
	};

	this.bind = function(name, value, type, callback) {
		var type = "";
		self.session.send_command({
			send : function() {
				return "\x03" + self.id + "\0" + name + "\0" + value + "\0"
						+ type + "\0"
			},
			parser : self.session.parser2,
			callback : callback
		});

	};

	this.results = function(callback) {
		self.session.send_command({
			send : function() {
				return "\x04" + self.id + "\0"
			},
			parser : self.parseResults,
			callback : callback
		});
	};

	// Iterator: returns array of items:
	this.parseResults = function() {
		do {
			// console.log("state",self.state,self.cache)
			progress = false;
			switch (self.state) {
			case "type":
				var r = parser.popByte(session);
				if (r) {
					self.state = (r.data == "\0") ? "status" : "item";
					progress = true;
				}
				break
			case "item":
				var r = parser.popLine(session);
				if (r) {
					self.state = "type";
					self.cache.push(r.data);
					progress = true;
				}
				break
			case "status":
				var r = parser.popByte(session);
				if (r) {
					if (r.data == "\0") {
						return {
							ok : true,
							result : self.cache
						}
					} else {
						self.state = "error"
					}
					progress = true;
				}
				break
			case "error":
				var r = parser.popLine(session)
				if (r) {
					return {
						ok : false,
						result : self.cache,
						info : r.result
					}
				}
				break
			}
		} while (progress)
	};

	this.execute = function(callback) {
		self.session.send_command({
			send : function() {
				return "\x05" + self.id + "\0"
			},
			parser : self.session.parser2,
			callback : callback
		});
	};

	this.info = function(callback) {
		self.session.send_command({
			send : function() {
				return "\x06" + self.id + "\0"
			},
			parser : self.session.parser2,
			callback : callback
		});
	};

	this.options = function(callback) {
		self.session.send_command({
			send : function() {
				return "\x07" + self.id + "\0"
			},
			parser : self.session.parser2,
			callback : callback
		});
	};

	// request id
	session.send_command({
		blocking : true,
		send : "\0" + query + "\0",
		parser : self.session.parser2,
		callback : function(err, reply) {
			self.id = reply.result;
			// if (exports.debug_mode) {
			// console.log("Query id: ", self.id, ", query: ", query);
			// }
			;
			self.session.setBlock(false);
		}
	});
}
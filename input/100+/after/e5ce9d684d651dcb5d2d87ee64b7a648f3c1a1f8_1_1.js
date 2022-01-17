function(reply) {
		self.buffer += reply;
		if (exports.debug_mode) {
			console.log(self.tag + "<<");
			console.dir(self.buffer);
		}

		if (self.state == states.CONNECTING) {
			var r=self.parser();
			if(r){
				self.send(self.username+"\0");
				var s = md5(md5(self.password) + r.data);
				self.send(s+"\0");
				self.state = states.AUTHORIZE;
			}
		} else if (self.state == states.AUTHORIZE) {
			if (!self.ok())
				throw "Access denied.";
			self.state = states.CONNECTED;
			if (exports.debug_mode) {
				console.log(self.tag + ": authorized");
			}
			self.emit("connect", 1);
			self.sendQueueItem();
		} else {
			var r;
			// console.log("parse");
			while (r = self.current_command.parser()) {
				if (exports.debug_mode) {
					console.log("response: ", r);
				}
				if (self.current_command.callback) {
					self.current_command.callback(r.ok ? null : r.info, r);
				}

				self.current_command = self.q_sent.shift();
				// assert.equal(self.buffer.length, 0, "buffer not empty:" +
				// self.buffer);
				if (!self.current_command) {
					break;
				}
			}
		}
	}
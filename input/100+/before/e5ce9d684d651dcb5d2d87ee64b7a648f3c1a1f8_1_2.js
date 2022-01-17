function() {
		if (-1 != self.buffer.indexOf("\0")) {
			// console.log(self.tag," parser2",self.current_command.send)
			// console.dir(self.buffer)
			var reply = self.readline();
			var ok = self.ok();
			var r = {
				ok : ok
			};
			if (ok) {
				r.result = reply
			} else {
				r.info = self.readline()
			}
			return r
		}

	}
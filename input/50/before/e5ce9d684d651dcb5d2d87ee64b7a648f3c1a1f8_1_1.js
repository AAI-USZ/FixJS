function() {
			var timestamp = self.readline();
			self.send(self.username+"\0");
			var s = md5(md5(self.password) + timestamp);
			self.send(s+"\0");
		}
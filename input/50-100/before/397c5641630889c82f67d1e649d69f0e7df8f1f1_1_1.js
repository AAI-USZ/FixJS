function(event) {
			self.readyState = this.readyState;
			if (self.readyState == 4) {
				self.responseText = this.responseText;
				self.responseXML  = this.responseXML;
				self.status       = this.status;
				self.statusText   = this.statusText;
			}
			if (self.onreadystatechange) self.onreadystatechangeCallback(event);
		}
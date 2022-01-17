function (config) {
			self.client = new Faye.Client("http://" + window.location.hostname + ":" + config.port + "/faye", {
				timeout: 120
			});

			self.client.subscribe("/stat", function (message) {
				// console.log("MESSAGE", message);
				self.drawMarker(message);
			});
		}
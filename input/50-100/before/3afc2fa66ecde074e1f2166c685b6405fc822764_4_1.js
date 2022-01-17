function(channel) {
		if (NotificationCenter) {
			NotificationCenter.off("updateClientsWorld");			
		}

		this.channel = channel;

		// Use the right factory and nc
		NotificationCenter = this.channel.notificationCenter;
		this.factory = this.channel.factory;

		var self = this;
		NotificationCenter.on("sendCommandToAllUsers", function(topic, args) {
			self.sendCommand.apply(self, args);
		});
	}
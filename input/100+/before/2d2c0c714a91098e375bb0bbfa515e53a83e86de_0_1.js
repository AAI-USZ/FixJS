function(manager) {
	this.manager = manager;

	this.map = {
		Manager: {
			self: manager,
			methods: {
				"shutdown": manager.shutdown
			}
		},
		Server: {
			self: function(item) { return manager.list[item[1]]; },
			methods: {
				"send": Server.prototype.send,
				"say": Server.prototype.say,
				"join": Server.prototype.join,
				"part": Server.prototype.part,
				"quit": Server.prototype.quit
			}
		},
		Channel: {
			self: function(item) {
				var server = this.Server.self(item);
				if (!server) {
					return null;
				} else {
					return { server: server, channel: item[2] };
				}
			},
			methods: {
				"join": function() { this.server.join(this.channel); },
				"part": function(message) { this.server.part(this.channel, message); },
				"say": function(message) { this.server.say(this.channel, message); }
			}
		},
		User: {
			self: function(item) {
				var server = this.Server.self(item);
				if (!server) {
					return null;
				} else {
					return { server: server, user: item[2] };
				}
			},
			methods: {
				"say": function(message) { this.server.say(this.user, message); }
			}
		}
	};
}
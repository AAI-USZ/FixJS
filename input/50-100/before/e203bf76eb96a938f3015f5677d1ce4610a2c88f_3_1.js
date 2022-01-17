function (message) {
				var msg = message.toJSON();
				if (msg.time) {
					msg.time = moment(msg.time).from(new Date());
				}
				self.$el.append(Mustache.render(messageTemplate, msg));
			}
function (message) {
				var msg = message.toJSON();
				if (msg.time) {
					msg.time = moment(msg.time).from(new Date());
				}
				console.log(msg);
				self.$el.append(self.template(msg));
			}
function () {
			var o = socket.options;
			this.$el.html(Mustache.render(titleTemplate, {
				address: o.host + ((o.port && o.port != 80) ? ':' + o.port : ''),
				me: me.get('name')
			}));
		}
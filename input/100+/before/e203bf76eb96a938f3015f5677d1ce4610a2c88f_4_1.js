function (titleTemplate, me, socket) {

	return Backbone.View.extend({

		tagName: 'h1',

		initialize: function () {
			me.on('change', this.render, this);
		},

		render: function () {
			var o = socket.options;
			this.$el.html(Mustache.render(titleTemplate, {
				address: o.host + ((o.port && o.port != 80) ? ':' + o.port : ''),
				me: me.get('name')
			}));
		},

		onClose: function () {
			me.off(null, null, this);
		}

	});

}
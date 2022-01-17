function (template, me, socket) {

	return Backbone.View.extend({

		tagName: 'h1',
		template: Handlebars.compile(template),

		initialize: function () {
			me.on('change', this.render, this);
		},

		render: function () {
			var o = socket.options;
			this.$el.html(this.template({
				address: o.host + ((o.port && o.port != 80) ? ':' + o.port : ''),
				me: me.get('name')
			}));
		},

		onClose: function () {
			me.off(null, null, this);
		}

	});

}
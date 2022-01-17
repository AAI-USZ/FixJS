function (template, users) {

	return Backbone.View.extend({

		tagName: 'ul',
		className: 'users',
		template: Handlebars.compile(template),

		initialize: function () {
			users.on('reset', this.render, this);
		},

		render: function () {
			this.$el.html(this.template({
				users: users.toJSON()
			}));
		},

		onClose: function () {
			users.off(null, null, this);
		}

	});

}
function (usersTemplate, users) {

	return Backbone.View.extend({

		tagName: 'ul',
		className: 'users',

		initialize: function () {
			users.on('reset', this.render, this);
		},

		render: function () {
			this.$el.html(Mustache.render(usersTemplate, {
				users: users.toJSON()
			}));
		},

		onClose: function () {
			users.off(null, null, this);
		}

	});

}
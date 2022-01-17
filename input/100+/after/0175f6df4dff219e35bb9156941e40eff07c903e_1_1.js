function (loginTemplate, socket) {

	return Backbone.View.extend({

		tagName: 'table',

		events: {
			'keypress #name': 'login'
		},

		render: function () {
			this.$el.html(Mustache.render(loginTemplate, {}));
			this.$('input').focus();
		},

		login: function (event) {
			if (event.which == 13) {
				this.options.router.navigate(this.$('#name').val(), { trigger: true });
			}
		}

	});

}
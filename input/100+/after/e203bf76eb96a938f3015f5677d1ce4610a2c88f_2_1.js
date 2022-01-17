function (template, socket) {

	return Backbone.View.extend({

		tagName: 'table',
		template: Handlebars.compile(template),

		events: {
			'keypress #name': 'login'
		},

		render: function () {
			this.$el.html(this.template({}));
			this.$('input').focus();
		},

		login: function (event) {
			if (event.which == 13) {
				this.options.router.navigate(this.$('#name').val(), { trigger: true });
			}
		}

	});

}
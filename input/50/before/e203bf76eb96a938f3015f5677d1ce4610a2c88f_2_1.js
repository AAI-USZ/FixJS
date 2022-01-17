function () {
			this.$el.html(Mustache.render(loginTemplate, {}));
			this.$('input').focus();
		}
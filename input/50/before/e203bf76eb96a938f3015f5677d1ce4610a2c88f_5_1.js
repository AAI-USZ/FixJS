function () {
			this.$el.html(Mustache.render(usersTemplate, {
				users: users.toJSON()
			}));
		}
function () {
			this.$el.html(this.template({
				users: users.toJSON()
			}));
		}
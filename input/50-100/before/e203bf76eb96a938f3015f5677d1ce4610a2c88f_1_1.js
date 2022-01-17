function () {
			this.renderSubview(new TitleView());
			this.renderSubview(new MessagesView());
			this.$el.append(Mustache.render(chatTemplate, {}));
			this.renderSubview(new UsersView());
			this.$('input').focus();
		}
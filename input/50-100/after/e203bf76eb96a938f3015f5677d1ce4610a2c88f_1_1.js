function () {
			this.renderSubview(new TitleView());
			this.renderSubview(new MessagesView());
			this.$el.append(this.template({}));
			this.renderSubview(new UsersView());
			this.$('input').focus();
		}
function(event) {

			this.$el.empty();
			this.$el.html(TapAPI.templateManager.get('page')({
				title: this.options.page_title,
				back_label: this.options.back_label
			}));
			this.renderContent();
			return this;

		}
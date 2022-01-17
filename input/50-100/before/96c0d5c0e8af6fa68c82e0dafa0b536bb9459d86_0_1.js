function(event) {

			this.$el.empty();
			this.$el.html(this.template({
				title: this.options.page_title,
				back_label: this.options.back_label
			}));
			this.renderContent();
			return this;

		}
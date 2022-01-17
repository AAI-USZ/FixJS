function() {
			var $el = $(this.el);
			$el.html(this.template(this.model.toJSON()));
			$el.toggleClass('completed', this.model.get('completed'));

			this.input = this.$('.edit');
			return this;
		}
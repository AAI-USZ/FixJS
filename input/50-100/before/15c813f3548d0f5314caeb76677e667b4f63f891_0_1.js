function() {
			var $el = $(this.el);
			$el.html(this.template(this.model.toJSON()));
			$el.toggleClass('done', this.model.get('done'));

			this.input = this.$('.edit');
			return this;
		}
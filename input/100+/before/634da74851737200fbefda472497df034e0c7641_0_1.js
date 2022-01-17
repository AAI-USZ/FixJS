function() {
			this.$el.empty();
			if(this.model.get('connected')) {
				this.$el.text(this.count);
				this.$el.addClass('badge-info');
			} else {
				this.$el.text('-');
				this.$el.removeClass('badge-info');
			}
			return this;
		}
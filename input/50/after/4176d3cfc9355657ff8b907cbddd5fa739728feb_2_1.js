function() {
		this.model.set({
			content: $('[name="content"]', this.$el).val(),
		});
		this.model.save();
	}
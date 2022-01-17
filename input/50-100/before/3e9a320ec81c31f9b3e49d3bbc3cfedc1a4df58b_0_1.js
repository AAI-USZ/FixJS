function() {
			var value = this.input.val().trim();

			if (!value)
				this.clear();

			this.model.save({title: value});
			$(this.el).removeClass("editing");
		}
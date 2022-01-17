function() {
			var template = $(this.model.getTemplate()).html();
			return _.template(template, null, {variable: 'data'});
		}
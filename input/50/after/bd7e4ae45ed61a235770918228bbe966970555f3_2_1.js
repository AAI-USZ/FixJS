function() {
			var template = $(this.model.getTemplate()).html();

			if (!template) {
				throw "Please specify template";
			}

			return _.template(template, null, {variable: 'data'});
		}
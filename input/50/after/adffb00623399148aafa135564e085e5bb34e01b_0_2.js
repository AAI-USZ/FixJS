function(data, template) {
			// refactor this to work with any other template engine in your constructor
			template = template || this.options.template;

			return Epitome.Template.compile(template, data)
		}
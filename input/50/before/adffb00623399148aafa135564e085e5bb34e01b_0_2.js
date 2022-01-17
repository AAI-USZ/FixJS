function(data) {
			// refactor this to work with any other template engine in your constructor
			return Epitome.Template.compile(this.options.template, data)
		}
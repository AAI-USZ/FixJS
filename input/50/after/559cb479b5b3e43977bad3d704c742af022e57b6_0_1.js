function(data, template) {
			// refactor this to work with any other template engine in your constructor
			template = template || this.options.template;

			// instantiate a template engine when needed
			var compiler = this.Template || (this.Template = new Epitome.Template());

			return compiler.template(template, data);
		}
function() {
				var output = Mustache.render(template);
				$(this.el).html(output);
			}
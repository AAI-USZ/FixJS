function() {
			// just render the tweet text as the content of this element.
			var data = {
					story : this.model,
					_ : _
				};
			
			
			if (this.options.thumb)
				{
				
				compiledTemplate = _.template(storyThumbTemplate, data);
				//$(this.el).html(compiledTemplate);
				console.log("rendering thumb view and this is the generated html: " + compiledTemplate);
				return compiledTemplate;
				}
			
			else
				{
				var compiledTemplate = _.template(storySingleTemplate, data);
				$("#page").prepend(compiledTemplate);
				//$(this.el).prepend(compiledTemplate);
			//$(this.el).html(this.model.get("stuff"));
			//$(this.el).html("TEST");
				return this;
				}
			
			
		}
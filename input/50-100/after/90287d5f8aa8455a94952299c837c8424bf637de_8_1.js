function() {
				var output = Mustache.render(template, this.model.toJSON());
				x = this.model.toJSON();
				$(this.el).addClass("span2").addClass("torrentInfo");
				$(this.el).html(output);
			}
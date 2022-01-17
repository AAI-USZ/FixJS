function() {
					console.log("rendering story list view");
					this.collection = storiesCollection;
					//goes through each story and adds a storySingleView for it
					this.collection.each(function(story) {
						
					      var singleView = new storiesSingleView({ model : story , thumb : true});
					      $("#page").prepend(singleView.render());
					      //$(this.el).prepend(singleView.render());
					      console.log("how does it look like in a story? " + singleView.render());
					      //singleView.render();
					    }, this);
				    
				 // var data = {};
				 // var compiledTemplate = _.template(storiesListTemplate,
					// data);
				 // this.el.html(compiledTemplate);
					return this;
				}
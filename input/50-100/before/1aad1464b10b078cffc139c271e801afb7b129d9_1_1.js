function(story) {
						
					      var singleView = new storiesSingleView({ model : story , thumb : true});
					      $(this.el).prepend(singleView.render().el);
					      //singleView.render();
					    }
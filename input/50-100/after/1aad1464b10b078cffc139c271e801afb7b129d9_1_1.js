function(story) {
						
					      var singleView = new storiesSingleView({ model : story , thumb : true});
					      $("#page").prepend(singleView.render());
					      //$(this.el).prepend(singleView.render());
					      console.log("how does it look like in a story? " + singleView.render());
					      //singleView.render();
					    }
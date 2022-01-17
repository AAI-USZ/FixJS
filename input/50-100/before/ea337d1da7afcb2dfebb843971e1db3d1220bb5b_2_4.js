function(options) {
			  var polledCount = 0;
			  
			  // Cancel any potential previous stream.
			  this.unstream();
			  
			  var update = utils.bind(function() {
				// Make a shallow copy of the options object.
				// `Backbone.collection.fetch` wraps the success function
				// in an outer function (line `527`), replacing options.success. 
				// That means if we don't copy the object every poll, we'll end 
				// up modifying the reference object and creating callback inception.
				// 
				// Furthermore, since the sync success wrapper
				// that wraps and replaces options.success has a different arguments
				// order, you'll end up getting the wrong arguments.
				var opts = collectionUtils.clone(options);
				
				if (!opts.tries || polledCount < opts.tries) {
				  polledCount = polledCount + 1;
				  
				  this.fetch(opts);
				  this.pollTimeout = setTimeout(update, opts.interval || 1000);
				}
			  }, this);
			
			  update();
			}
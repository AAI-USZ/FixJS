function() {
			
			// Add a `close` utility method to Backbone.View to serve as a wrapper for `remove`, and `unbind`.
			// This allows a view to clean up after itself by removing its DOM elements, unbind any events, and
			// call an `onClose` method in case any additional cleanup needs to happen (e.g. - unbinding any
			// events explicitly bound to the model or event aggregator).
			Backbone.View.prototype.close = function() {
			    this.remove();  // Removes the DOM representation of the View
			    this.unbind();  // Unbinds any DOM events associated with the View
			    if (typeof this.onClose === 'function') {
			        
			    	// Call onClose if it's defined on the view. This lets us unbind any events
			    	// and do any extra cleanup that tie the View to anything else (models,
			    	// collections, child views, etc)
			        this.onClose.call(this);
			    }
			};
		}
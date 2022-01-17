function() {
				 // Restore the previous status
				 var surface = this.surface;
				 surface.exchangeTool.importShapes(surface.cached, true, dojo.hitch(Review, Review.getColor)); // FIXME: Unique surface is required
				 surface.deactivate();
				 this._refreshSurface(surface);
				 surface.commentId = ""; // Clear the filter so that no shapes can be selected
			 }
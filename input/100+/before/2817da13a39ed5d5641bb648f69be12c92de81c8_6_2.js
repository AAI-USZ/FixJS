function(reviewer, commentId, pageState, viewScene) {
				 surface.activate();
				 surface.cached = surface.exchangeTool.exportShapesByAttribute();
				 surface.currentReviewer = reviewer;
				 surface.commentId = commentId;
				 surface.filterState = pageState;
				 surface.filterScene = viewScene;
				 surface.filterComments = [commentId];
				 this._refreshSurface(surface);
			 }
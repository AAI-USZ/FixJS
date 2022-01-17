function(reviewer, commentId, args) {
				 var pageState = args.pageState;
				 var pageStateList = args.pageStateList;
				 var viewScene = args.viewScene;
				 var viewSceneList = args.viewSceneList;
				 var surface = this.surface;
				 surface.activate();
				 surface.cached = surface.exchangeTool.exportShapesByAttribute();
				 surface.currentReviewer = reviewer;
				 surface.commentId = commentId;
				 surface.filterState = pageState;
				 surface.filterStateList = pageStateList;
				 surface.filterScene = viewScene;
				 surface.filterSceneList = viewSceneList;
				 surface.filterComments = [commentId];
				 this._refreshSurface(surface);
			 }
function(/*Object*/ stateinfo, /*Array*/ commentIds) {
				 var surface = this.surface;
				 surface.filterState = stateinfo.pageState;
				 surface.filterStateList = stateinfo.pageStateList;
				 surface.filterScene = stateinfo.viewScene;
				 surface.filterSceneList = stateinfo.viewSceneList;
				 surface.filterComments = commentIds;
				 this._refreshSurface(surface);
			 }
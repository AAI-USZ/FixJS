function(/*Object*/ stateinfo, /*Array*/ commentIds) {
				 var surface = this.surface;
/*FIXME: surface should update based on event listeners to setstate and setscene
				 surface.filterState = stateinfo.pageState;
				 surface.filterStateList = stateinfo.pageStateList;
				 surface.filterScene = stateinfo.viewScene;
				 surface.filterSceneList = stateinfo.viewSceneList;
*/
				 var statesFocus = States.getFocus(this.rootNode);
				 surface.filterState = statesFocus ? statesFocus.state : undefined;
				 surface.filterStateList = this.getCurrentStates();
				 surface.filterScene =  this.getCurrentScene();
				 surface.filterSceneList = this.getCurrentScenes();
				 surface.filterComments = commentIds;
				 this._refreshSurface(surface);
			 }
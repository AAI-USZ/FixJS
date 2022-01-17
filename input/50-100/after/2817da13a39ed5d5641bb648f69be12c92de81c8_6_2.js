function differentStateScene(shape, surface){
			if(!shape || !surface){
				return false;
			}
			if(!that.stateSceneCheck(shape.stateList, shape.sceneList, surface.filterStateList, surface.filterSceneList)){
				return true;
			}
			return false;
		}
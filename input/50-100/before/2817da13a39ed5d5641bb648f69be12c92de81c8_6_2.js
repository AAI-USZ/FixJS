function differentStateScene(Shape, Surface){
			if(!Shape || !Surface){
				return false;
			}
			if(Shape.state && Surface.filterState && Shape.state != Surface.filterState){
				return true;	// there is a difference
			}
			if(Shape.scene && Surface.filterScene && Shape.scene != Surface.filterScene){
				return true;	// there is a difference
			}
			return false;
		}
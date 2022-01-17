function(/*String*/moveTo){
			// summary:
			//		Searches for a starting view and a destination view.
			if(!moveTo){ return []; }
			var view = registry.byId(moveTo.replace(/^#/, ""));
			if(!view){ return []; }
			for(var v = view.getParent(); v; v = v.getParent()){ // search for the topmost invisible parent node
				if(v.isVisible && !v.isVisible()){
					view = v;
				}
			}
			return [view.getShowingView(), view]; // fromView, toView
		}
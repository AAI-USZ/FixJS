function(/*dojox/mobile/View*/ view){
			// summary:
			//		Gets the parent view of the specified view.
			// returns: dojox/mobile/View
			for(var v = view.getParent(); v; v = v.getParent()){
				if(domClass.contains(v.domNode, "mblView")){ return v; }
			}
			return null;
		}
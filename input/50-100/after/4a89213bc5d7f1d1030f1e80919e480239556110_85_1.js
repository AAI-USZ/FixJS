function(/*String*/ fromViewId, /*String*/ toViewId, /*Object*/args){
			// summary:
			//		Adds transition information.
			this.transitionInfo[fromViewId.replace(/^#/, "") + ":" + toViewId.replace(/^#/, "")] = args;
		}
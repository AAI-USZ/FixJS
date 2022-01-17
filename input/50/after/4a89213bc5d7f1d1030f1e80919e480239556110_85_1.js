function(/*String*/ fromViewId, /*String*/ toViewId){
			// summary:
			//		Returns an array containing the transition information.
			return this.transitionInfo[fromViewId.replace(/^#/, "") + ":" + toViewId.replace(/^#/, "")]; // Array
		}